import { updateField } from '../lib/spreadsheet';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { date, sectionId, fieldId, value } = await request.json();
    
    // Debug logging
    console.log('Updating field:', {
      date,
      sectionId,
      fieldId,
      value,
      fieldKey: `${sectionId}_${fieldId}`
    });
    
    await updateField(date, sectionId, fieldId, value);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating field:', error);
    return NextResponse.json({ success: false, error: 'Failed to update field' }, { status: 500 });
  }
} 