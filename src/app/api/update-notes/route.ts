import { updateNotes } from '../lib/spreadsheet';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { date, notes } = await request.json();
    await updateNotes(date, notes);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notes:', error);
    return NextResponse.json({ success: false, error: 'Failed to update notes' }, { status: 500 });
  }
} 