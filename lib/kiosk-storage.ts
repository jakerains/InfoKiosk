import { promises as fs } from 'fs';
import path from 'path';
import type { KioskConfig } from '@/types/kiosk';

export const KIOSKS_DIR = path.join(process.cwd(), 'data', 'kiosks');

// Helper functions for kiosk file operations
export async function ensureKiosksDirectory() {
  await fs.mkdir(KIOSKS_DIR, { recursive: true });
}

export async function saveKioskToFile(kiosk: KioskConfig) {
  const kioskPath = path.join(KIOSKS_DIR, `${kiosk.id}.json`);
  await fs.writeFile(kioskPath, JSON.stringify(kiosk, null, 2));
}

export async function loadKioskFromFile(kioskId: string) {
  const kioskPath = path.join(KIOSKS_DIR, `${kioskId}.json`);
  const content = await fs.readFile(kioskPath, 'utf8');
  return JSON.parse(content) as KioskConfig;
}

export async function getAllKiosks() {
  const files = await fs.readdir(KIOSKS_DIR);
  const kiosks: Record<string, KioskConfig> = {};
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = await fs.readFile(path.join(KIOSKS_DIR, file), 'utf8');
      const kiosk = JSON.parse(content) as KioskConfig;
      kiosks[kiosk.id] = kiosk;
    }
  }
  
  return kiosks;
}

export async function exportKiosk(kioskId: string) {
  return await loadKioskFromFile(kioskId);
}

export async function importKiosk(kioskData: KioskConfig) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const newId = `kiosk-${timestamp}-${randomString}`;
  
  const newKiosk = {
    ...kioskData,
    id: newId,
    name: `${kioskData.name} (Imported)`,
    headerTitle: `${kioskData.headerTitle} (Imported)`
  };
  
  await saveKioskToFile(newKiosk);
  return newKiosk;
}

export async function deleteKiosk(kioskId: string) {
  const kioskPath = path.join(KIOSKS_DIR, `${kioskId}.json`);
  try {
    await fs.unlink(kioskPath);
  } catch (err) {
    console.error(`Error deleting kiosk ${kioskId}:`, err);
    throw err;
  }
}
