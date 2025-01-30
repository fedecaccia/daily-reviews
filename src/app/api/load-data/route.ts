import { loadDayData } from '../lib/spreadsheet';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    // Verificar que las variables de entorno estén definidas
    const requiredEnvVars = [
      'GOOGLE_SHEETS_PRIVATE_KEY',
      'GOOGLE_SHEETS_CLIENT_EMAIL',
      'GOOGLE_SHEETS_SPREADSHEET_ID'
    ];

    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingEnvVars.length > 0) {
      console.error('Missing environment variables:', missingEnvVars);
      return NextResponse.json({
        error: 'Configuration error',
        details: `Missing environment variables: ${missingEnvVars.join(', ')}`
      }, { status: 500 });
    }

    // Log de las variables de entorno (sin mostrar valores completos por seguridad)
    console.log('Environment variables status:', {
      PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.slice(0, 20) + '...',
      CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL?.slice(0, 10) + '...',
      SPREADSHEET_ID: process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.slice(0, 10) + '...'
    });

    const data = await loadDayData(date);
    
    if (!data) {
      return NextResponse.json({ 
        error: 'No data found',
        details: `No data found for date: ${date}`
      }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Load data error:', error);
    
    // Mejorar el mensaje de error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json({
      error: 'Failed to load data',
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 