import { NextResponse } from 'next/server';
import { getAllKiosks } from '@/lib/kiosk-storage';

export async function GET() {
  try {
    const kiosks = await getAllKiosks();
    return NextResponse.json(kiosks);
  } catch (err) {
    console.error('Error reading kiosks:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 