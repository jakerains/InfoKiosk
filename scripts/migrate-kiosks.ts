import { promises as fs } from 'fs';
import path from 'path';
import { KIOSKS_DIR } from '@/lib/kiosk-storage';

async function migrateKiosks() {
  try {
    // Create kiosks directory if it doesn't exist
    await fs.mkdir(KIOSKS_DIR, { recursive: true });
    
    // Read the original kiosks.json file
    const oldDataPath = path.join(process.cwd(), 'data', 'kiosks.json');
    const oldData = await fs.readFile(oldDataPath, 'utf8');
    const kiosks = JSON.parse(oldData);
    
    // Create individual files for each kiosk
    for (const [id, kiosk] of Object.entries(kiosks)) {
      const kioskPath = path.join(KIOSKS_DIR, `${id}.json`);
      await fs.writeFile(kioskPath, JSON.stringify(kiosk, null, 2));
      console.log(`Created ${id}.json`);
    }
    
    // Backup the original file
    await fs.rename(oldDataPath, `${oldDataPath}.backup`);
    console.log('Migration complete! Original file backed up as kiosks.json.backup');
    
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

migrateKiosks();
