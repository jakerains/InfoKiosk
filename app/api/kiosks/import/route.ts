import { NextResponse } from 'next/server';
import { importKiosk } from '@/lib/kiosk-storage';
import type { KioskConfig } from '@/types/kiosk';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const kioskData = await request.json() as KioskConfig;
    const importedKiosk = await importKiosk(kioskData);
    return NextResponse.json(importedKiosk);
  } catch (err) {
    console.error('Import error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 