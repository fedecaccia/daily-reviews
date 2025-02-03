import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Constantes
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms
const OPERATION_TIMEOUT = 1000; // 5 segundos máximo por operación
const RATE_LIMIT_DELAY = 1000; // Aumentado a 5 segundos entre operaciones

// Cache de conexión y datos
let cachedDoc: GoogleSpreadsheet | null = null;
let lastRequestTime = 0;
let cachedRows: any[] | null = null;
let lastRowsFetch = 0;
const CACHE_TTL = 5000; // Aumentado a 5 segundos de TTL para el cache
const ROW_CACHE: { [key: string]: any } = {}; // Cache para filas individuales

async function waitForRateLimit() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await wait(RATE_LIMIT_DELAY - timeSinceLastRequest);
  }
  
  lastRequestTime = Date.now();
}

async function ensureHeaders(sheet: any) {
  try {
    // Primero cargar la hoja
    await sheet.loadHeaderRow();
    const headerValues = sheet.headerValues;
    
    // Verificar qué headers faltan
    const missingHeaders = HEADERS.filter(header => !headerValues.includes(header));
    
    if (missingHeaders.length > 0) {
      console.log('Adding new headers at the end:', missingHeaders);
      
      // Calcular el número total de columnas necesarias
      const totalColumns = headerValues.length + missingHeaders.length;
      
      // Redimensionar la hoja si es necesario
      if (sheet.columnCount < totalColumns) {
        console.log(`Resizing sheet from ${sheet.columnCount} to ${totalColumns} columns`);
        await sheet.resize({ columnCount: totalColumns });
      }
      
      // Agregar los headers faltantes al final
      const newHeaders = [...headerValues, ...missingHeaders];
      await sheet.setHeaderRow(newHeaders);
    }
  } catch (error) {
    console.error('Error ensuring headers:', error);
    throw error;
  }
}

async function getSpreadsheetConnection() {
  try {
    // Si ya tenemos una conexión cacheada, verificar que siga siendo válida
    if (cachedDoc) {
      try {
        await cachedDoc.loadInfo();
        return cachedDoc;
      } catch (error) {
        console.log('Cached connection invalid, creating new one');
        cachedDoc = null;
      }
    }

    const SCOPES = [
      'https://www.googleapis.com/auth/spreadsheets',
    ];

    const jwt = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: SCOPES,
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID!, jwt);
    await doc.loadInfo(); // Asegurarnos de que el documento está cargado
    
    // Asegurarnos de que existan todas las columnas necesarias
    const sheet = doc.sheetsByIndex[0];
    await ensureHeaders(sheet);

    // Solo cachear después de que todo esté correctamente inicializado
    cachedDoc = doc;
    return doc;
  } catch (error) {
    cachedDoc = null;
    console.error('Error getting spreadsheet connection:', error);
    throw error;
  }
}

async function getSheetRows(sheet: any) {
  const now = Date.now();
  if (cachedRows && (now - lastRowsFetch) < CACHE_TTL) {
    return cachedRows;
  }

  await waitForRateLimit();
  cachedRows = await sheet.getRows();
  lastRowsFetch = now;
  return cachedRows;
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Función para ejecutar una operación con timeout
async function withTimeout<T>(operation: () => Promise<T>): Promise<T> {
  const timeoutPromise = new Promise<T>((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out')), OPERATION_TIMEOUT);
  });

  return Promise.race([operation(), timeoutPromise]);
}

async function withRetry<T>(operation: () => Promise<T>): Promise<T> {
  let lastError;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt === MAX_RETRIES) throw error;
      
      // Si es un error de rate limit, esperamos más tiempo
      const delay = error.status === 429 
        ? RETRY_DELAY * Math.pow(2, attempt + 1)  // Más tiempo para rate limits
        : RETRY_DELAY * Math.pow(2, attempt - 1);  // Tiempo normal para otros errores
      
      await wait(delay);
    }
  }
  
  throw lastError;
}

export const HEADERS = [
  'date',
  'workout_running',
  'workout_swimming',
  'workout_abs',
  'workout_chest',
  'workout_back',
  'workout_shoulders',
  'workout_biceps',
  'workout_triceps',
  'workout_legs',
  'workout_stretching',
  'workout_aerobic',
  'relax_yoga',
  'relax_meditation',
  'relax_tea',
  'health_sleep_seven',
  'health_acidity',
  'health_systolic',
  'health_diastolic',
  'health_headache',
  'habits_nail_biting',
  'habits_posture',
  'productivity_level',
  'productivity_reading_time',
  'nutrition_fruits',
  'nutrition_polyphenols',
  'nutrition_heavy_food',
  'nutrition_fast_food',
  'nutrition_yogurt',
  'life_couple_discussions',
  'life_gaming',
  'notes'
];

// Mapa de tipos de campos
const FIELD_TYPES: Record<string, 'boolean' | 'minutes' | 'slider' | 'text'> = {
  'workout_running': 'minutes',
  'workout_swimming': 'boolean',
  'workout_abs': 'boolean',
  'workout_chest': 'boolean',
  'workout_back': 'boolean',
  'workout_shoulders': 'boolean',
  'workout_biceps': 'boolean',
  'workout_triceps': 'boolean',
  'workout_legs': 'boolean',
  'workout_stretching': 'boolean',
  'workout_aerobic': 'boolean',
  'relax_yoga': 'boolean',
  'relax_meditation': 'boolean',
  'relax_tea': 'boolean',
  'health_sleep_seven': 'boolean',
  'health_acidity': 'boolean',
  'health_systolic': 'minutes',
  'health_diastolic': 'minutes',
  'health_headache': 'boolean',
  'habits_nail_biting': 'boolean',
  'habits_posture': 'boolean',
  'productivity_level': 'slider',
  'productivity_reading_time': 'minutes',
  'nutrition_fruits': 'minutes',
  'nutrition_polyphenols': 'boolean',
  'nutrition_heavy_food': 'boolean',
  'nutrition_fast_food': 'boolean',
  'nutrition_yogurt': 'boolean',
  'life_couple_discussions': 'slider',
  'life_gaming': 'boolean',
  'notes': 'text'
};

export async function updateField(date: string, sectionId: string, fieldId: string, value: string | number | boolean) {
  return withRetry(async () => {
    const doc = await getSpreadsheetConnection();
    const sheet = doc.sheetsByIndex[0];
    
    // Una sola lectura para encontrar o crear la fila
    const rows = await sheet.getRows();
    if (!rows) {
      throw new Error('Failed to get sheet rows');
    }
    
    const rowIndex = rows.findIndex(row => row.get('date') === date);
    const fieldKey = `${sectionId}_${fieldId}`;

    try {
      if (rowIndex === -1) {
        // Si no existe la fila, la creamos con TODOS los campos inicializados
        const newRow: Record<string, any> = {
          date,
        };
        
        // Inicializar todos los campos con sus valores por defecto según su tipo
        HEADERS.forEach(header => {
          if (header === 'date') return; // Skip date as it's already set
          
          const fieldType = FIELD_TYPES[header];
          switch (fieldType) {
            case 'boolean':
              newRow[header] = 'FALSE';
              break;
            case 'minutes':
              newRow[header] = '0';
              break;
            case 'slider':
              newRow[header] = '1';
              break;
            case 'text':
              newRow[header] = '';
              break;
          }
        });
        
        // Actualizar el campo específico con el valor proporcionado
        newRow[fieldKey] = typeof value === 'boolean' ? value.toString().toUpperCase() : value.toString();
        
        // Solo una escritura para crear la fila
        await sheet.addRow(newRow);
      } else {
        // Si existe, actualizamos solo el campo específico
        const formattedValue = typeof value === 'boolean' ? value.toString().toUpperCase() : value.toString();
        rows[rowIndex].set(fieldKey, formattedValue);
        
        // Solo una escritura para actualizar el campo
        await rows[rowIndex].save();
      }
    } catch (error) {
      console.error('Error in updateField operation:', {
        error,
        date,
        sectionId,
        fieldId,
        value,
        fieldKey
      });
      throw error;
    }
  });
}

export async function updateNotes(date: string, notes: string) {
  return withRetry(async () => {
    const doc = await getSpreadsheetConnection();
    const sheet = doc.sheetsByIndex[0];
    
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.get('date') === date);
    
    if (rowIndex === -1) {
      // Si no existe la fila, la creamos con TODOS los campos inicializados
      const newRow: Record<string, any> = {
        date,
      };
      
      // Inicializar todos los campos con sus valores por defecto según su tipo
      HEADERS.forEach(header => {
        if (header === 'date') return; // Skip date as it's already set
        
        const fieldType = FIELD_TYPES[header];
        switch (fieldType) {
          case 'boolean':
            newRow[header] = 'FALSE';
            break;
          case 'minutes':
            newRow[header] = '0';
            break;
          case 'slider':
            newRow[header] = '1';
            break;
          case 'text':
            newRow[header] = header === 'notes' ? notes : '';
            break;
        }
      });
      
      await sheet.addRow(newRow);
    } else {
      rows[rowIndex].set('notes', notes);
      await rows[rowIndex].save();
    }
  });
}

interface DayData {
  [key: string]: string | number | boolean;
}

export async function ensureAndLoadDay(date: string): Promise<DayData | null> {
  return withRetry(async () => {
    const doc = await getSpreadsheetConnection();
    const sheet = doc.sheetsByIndex[0];
    
    // Intentar cargar la fila existente
    const rows = await sheet.getRows();
    const existingRow = rows?.find(row => row.get('date') === date);
    
    if (existingRow) {
      // Si la fila existe, convertir los valores según su tipo
      const data: DayData = {};
      HEADERS.forEach(header => {
        const value = existingRow.get(header);
        const fieldType = FIELD_TYPES[header];
        
        switch (fieldType) {
          case 'boolean':
            data[header] = value?.toLowerCase() === 'true';
            break;
          case 'minutes':
          case 'slider':
            data[header] = parseInt(value || '0', 10);
            break;
          default:
            data[header] = value || '';
        }
      });
      return data;
    }
    
    // Si no existe, crear una nueva fila con valores por defecto
    const newRow: Record<string, any> = { date };
    HEADERS.forEach(header => {
      if (header === 'date') return;
      
      const fieldType = FIELD_TYPES[header];
      switch (fieldType) {
        case 'boolean':
          newRow[header] = false;
          break;
        case 'minutes':
        case 'slider':
          newRow[header] = 0;
          break;
        default:
          newRow[header] = '';
      }
    });
    
    // Agregar la nueva fila
    await sheet.addRow(newRow);
    
    return newRow;
  });
}

export async function ensureDayExists(date: string): Promise<void> {
  return withRetry(async () => {
    const doc = await getSpreadsheetConnection();
    const sheet = doc.sheetsByIndex[0];
    
    // Intentar cargar la fila existente
    const rows = await sheet.getRows();
    const existingRow = rows?.find(row => row.get('date') === date);
    
    if (!existingRow) {
      // Si no existe, crear una nueva fila con valores por defecto
      const newRow: Record<string, any> = { date };
      HEADERS.forEach(header => {
        if (header === 'date') return;
        
        const fieldType = FIELD_TYPES[header];
        switch (fieldType) {
          case 'boolean':
            newRow[header] = false;
            break;
          case 'minutes':
          case 'slider':
            newRow[header] = 0;
            break;
          default:
            newRow[header] = '';
        }
      });
      
      // Agregar la nueva fila
      await sheet.addRow(newRow);
    }
  });
} 