import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

let doc: GoogleSpreadsheet;

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

// Inicializar la conexión
async function initializeSheet() {
  if (!doc) {
    const SCOPES = [
      'https://www.googleapis.com/auth/spreadsheets',
    ];

    const jwt = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: SCOPES,
    });

    doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID!, jwt);
    await doc.loadInfo();

    // Obtener la primera hoja
    const sheet = doc.sheetsByIndex[0];
    
    try {
      // Intentar cargar los headers existentes
      await sheet.loadHeaderRow();
    } catch (error) {
      // Si no hay headers, los establecemos
      await sheet.setHeaderRow(HEADERS);
    }
  }
}

export async function updateField(date: string, sectionId: string, fieldId: string, value: string | number | boolean) {
  await initializeSheet();
  const sheet = doc.sheetsByIndex[0];
  
  const rows = await sheet.getRows();
  const rowIndex = rows.findIndex(row => row.get('date') === date);
  
  if (rowIndex === -1) {
    // Si no existe la fila, la creamos
    await sheet.addRow({
      date,
      [`${sectionId}_${fieldId}`]: value
    });
  } else {
    // Si existe, actualizamos el campo específico
    rows[rowIndex].set(`${sectionId}_${fieldId}`, value);
    await rows[rowIndex].save();
  }
}

export async function updateNotes(date: string, notes: string) {
  await initializeSheet();
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
}

export async function loadDayData(date: string) {
  await initializeSheet();
  const sheet = doc.sheetsByIndex[0];
  
  const rows = await sheet.getRows();
  const row = rows.find(row => row.get('date') === date);
  
  if (!row) return null;

  // Convertir la fila a un objeto con todos los campos
  const data: Record<string, any> = {};
  HEADERS.forEach(header => {
    const value = row.get(header);
    
    if (header === 'notes') {
      // Para las notas, guardamos el valor directo sin procesar
      data[header] = value || '';
      console.log('Notes loaded:', value); // Debug
    } else if (header === 'date') {
      // Para la fecha, guardamos el string directo
      data[header] = value;
    } else {
      // Para el resto de campos
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
  
  console.log('Full loaded data:', data); // Para debugging
  return data;
} 