import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'kiosks.json');

// Helper function to read kiosks data
async function getKiosks() {
  const fileContents = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kiosks = await getKiosks();
    const kiosk = kiosks[params.id];
    
    if (!kiosk) {
      return NextResponse.json({ error: 'Kiosk not found' }, { status: 404 });
    }
    
    return NextResponse.json(kiosk);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const kiosks = await getKiosks();
    
    if (!kiosks[params.id]) {
      return NextResponse.json({ error: 'Kiosk not found' }, { status: 404 });
    }

    delete kiosks[params.id];
    await fs.writeFile(dataFilePath, JSON.stringify(kiosks, null, 2));
    
    return NextResponse.json({ message: 'Kiosk deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updatedKiosk = await request.json();
    const kiosks = await getKiosks();
    
    kiosks[params.id] = updatedKiosk;
    await fs.writeFile(dataFilePath, JSON.stringify(kiosks, null, 2));
    
    return NextResponse.json(updatedKiosk);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}