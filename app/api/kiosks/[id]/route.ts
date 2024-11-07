import { NextResponse } from 'next/server';
import { loadKioskFromFile, saveKioskToFile, deleteKiosk } from '@/lib/kiosk-storage';
import type { KioskConfig } from '@/types/kiosk';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params
    const kiosk = await loadKioskFromFile(id);
    return NextResponse.json(kiosk);
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Kiosk not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params
    const updatedKiosk: KioskConfig = await request.json();
    await saveKioskToFile(updatedKiosk);
    return NextResponse.json(updatedKiosk);
  } catch (err) {
    console.error('Update error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params
    await deleteKiosk(id);
    return NextResponse.json({ message: 'Kiosk deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}