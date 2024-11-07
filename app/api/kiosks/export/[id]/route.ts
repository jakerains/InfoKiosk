import { NextResponse } from 'next/server';
import { exportKiosk } from '@/lib/kiosk-storage';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const kiosk = await exportKiosk(params.id);
    
    // Set headers for file download
    return new NextResponse(JSON.stringify(kiosk, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="kiosk-${params.id}.json"`
      }
    });
  } catch (err) {
    console.error('Export error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 