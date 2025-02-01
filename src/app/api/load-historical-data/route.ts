import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { HEADERS } from '../lib/spreadsheet';

export async function GET() {
  try {
    const SCOPES = [
      'https://www.googleapis.com/auth/spreadsheets',
    ];

    const jwt = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: SCOPES,
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID!, jwt);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // Convertir los datos a un formato más amigable para las gráficas
    const data = rows.map(row => {
      const rowData: Record<string, any> = {};
      
      HEADERS.forEach(header => {
        const value = row.get(header);
        
        if (header === 'date') {
          rowData[header] = value;
        } else if (value === 'TRUE' || value === 'true') {
          rowData[header] = 1; // Convertir booleanos a números para las gráficas
        } else if (value === 'FALSE' || value === 'false') {
          rowData[header] = 0;
        } else if (!isNaN(Number(value)) && value !== '') {
          rowData[header] = Number(value);
        } else {
          rowData[header] = value || '';
        }
      });
      
      return rowData;
    });

    // Ordenar por fecha
    data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading historical data:', error);
    return NextResponse.json({ error: 'Failed to load historical data' }, { status: 500 });
  }
} 