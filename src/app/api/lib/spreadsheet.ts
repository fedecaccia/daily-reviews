import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Constantes
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms
const OPERATION_TIMEOUT = 5000; // 5 segundos máximo por operación
const RATE_LIMIT_DELAY = 2000; // 2 segundos entre operaciones

// Cache de conexión y datos
let cachedDoc: GoogleSpreadsheet | null = null;
let lastRequestTime = 0;
let cachedRows: any[] | null = null;
let lastRowsFetch = 0;
const CACHE_TTL = 1000; // 1 segundo de TTL para el cache

async function waitForRateLimit() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await wait(RATE_LIMIT_DELAY - timeSinceLastRequest);
  }
  
  lastRequestTime = Date.now();
}

async function getSpreadsheetConnection() {
  try {
    if (!cachedDoc) {
      const SCOPES = [
        'https://www.googleapis.com/auth/spreadsheets',
      ];

      const jwt = new JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: SCOPES,
      });

      cachedDoc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID!, jwt);
      await cachedDoc.loadInfo();
    }
    return cachedDoc;
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

const HEADERS = [
  'date',
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
  'health_sleep_seven',
  'health_acidity',
  'productivity_level',
  'productivity_reading',
  'nutrition_fruits',
  'nutrition_polyphenols',
  'nutrition_heavy_food',
  'nutrition_fast_food',
  'nutrition_yogurt',
  'life_couple_discussions',
  'life_gaming',
  'notes'
];

export async function updateField(date: string, sectionId: string, fieldId: string, value: string | number | boolean) {
  return withRetry(async () => {
    const doc = await getSpreadsheetConnection();
    const sheet = doc.sheetsByIndex[0];
    
    // Una sola lectura para encontrar o crear la fila
    const rows = await sheet.getRows();
    const rowIndex = rows.findIndex(row => row.get('date') === date);
    const fieldKey = `${sectionId}_${fieldId}`;

    try {
      if (rowIndex === -1) {
        // Si no existe la fila, la creamos con el campo específico
        const newRow: Record<string, any> = {
          date,
          [fieldKey]: typeof value === 'boolean' ? value.toString().toUpperCase() : value.toString()
        };
        
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
      await sheet.addRow({
        date,
        notes
      });
    } else {
      rows[rowIndex].set('notes', notes);
      await rows[rowIndex].save();
    }
  });
}

interface DayData {
  [key: string]: string | number | boolean;
}

export async function loadDayData(date: string): Promise<DayData | null> {
  return withRetry(async () => {
    const doc = await getSpreadsheetConnection();
    const sheet = doc.sheetsByIndex[0];
    
    // Una sola lectura para obtener los datos del día
    const rows = await sheet.getRows();
    const row = rows.find(row => row.get('date') === date);
    
    if (!row) return null;

    const data: DayData = {};
    HEADERS.forEach(header => {
      const value = row.get(header);
      
      if (header === 'notes') {
        data[header] = value || '';
      } else if (header === 'date') {
        data[header] = value;
      } else {
        if (value === 'TRUE' || value === 'true') {
          data[header] = true;
        } else if (value === 'FALSE' || value === 'false') {
          data[header] = false;
        } else if (!isNaN(Number(value)) && value !== '') {
          data[header] = Number(value);
        } else {
          data[header] = value || '';
        }
      }
    });
    
    return data;
  });
} 