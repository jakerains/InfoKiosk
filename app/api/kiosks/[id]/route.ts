import { NextResponse } from 'next/server';
import { KioskConfig } from '@/types/kiosk';
import kiosks from '@/data/kiosks.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const kiosk = kiosks[id as keyof typeof kiosks];
  
  if (!kiosk) {
    return NextResponse.json(
      { error: 'Kiosk not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(kiosk);
}