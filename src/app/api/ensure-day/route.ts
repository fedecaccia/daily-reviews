import { ensureDayExists } from '../lib/spreadsheet';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { date } = await request.json();
    await ensureDayExists(date);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error ensuring day exists:', error);
    return NextResponse.json({ success: false, error: 'Failed to ensure day exists' }, { status: 500 });
  }
} 