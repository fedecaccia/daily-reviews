import { GoogleSpreadsheet } from 'google-spreadsheet';

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_SPREADSHEET_ID);

await doc.useServiceAccountAuth({
  client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
  private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n'),
});

export async function appendToSheet(data: any) {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; // asumiendo que usamos la primera hoja
  await sheet.addRow(data);
} 