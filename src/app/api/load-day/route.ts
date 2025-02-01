import { NextResponse } from 'next/server';
import { ensureAndLoadDay } from '../lib/spreadsheet';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const data = await ensureAndLoadDay(date);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in load-day route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 