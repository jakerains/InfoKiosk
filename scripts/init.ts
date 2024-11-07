import { promises as fs } from 'fs'
import path from 'path'
import { KIOSKS_DIR, saveKioskToFile } from '@/lib/kiosk-storage'

const initialKioskData = {
  "demo-1": {
    "id": "demo-1",
    "name": "AI Innovation Lab",
    "headerTitle": "INNOVATION LAB",
    "headerSubtitle": "",
    "backgroundWords": ["INNOVATE", "INSPIRE", "CONNECT", "THRIVE"],
    "mainTitle": "Build with cutting-edge technology",
    "mainDescription": "Experience the power of our latest innovations in AI and machine learning.",
    "showPoweredBy": true,
    "footerText": "Powered by GenAIJake",
    "mainIcon": "Cpu",
    "infoBox1": {
      "title": "Tech Stack",
      "content": ["React", "Next.js", "TypeScript", "TensorFlow.js"]
    },
    "infoBox2": {
      "title": "Use Cases",
      "content": ["Natural Language Processing", "Image Recognition", "Predictive Analytics"]
    },
    "sections": [],
    "verticalLayout": false
  }
}

async function init() {
  try {
    // Create kiosks directory if it doesn't exist
    await fs.mkdir(KIOSKS_DIR, { recursive: true })
    
    // Check if old kiosks.json exists and migrate if needed
    const oldDataPath = path.join(process.cwd(), 'data', 'kiosks.json')
    try {
      const oldData = await fs.readFile(oldDataPath, 'utf8')
      const kiosks = JSON.parse(oldData)
      
      // Migrate each kiosk to its own file
      for (const [id, kiosk] of Object.entries(kiosks)) {
        await saveKioskToFile(kiosk as any)
      }
      
      // Optionally backup and remove the old file
      await fs.rename(oldDataPath, `${oldDataPath}.backup`)
      console.log('Migrated existing kiosks to individual files')
    } catch (err) {
      // If old file doesn't exist, create demo kiosk
      const demoKioskPath = path.join(KIOSKS_DIR, 'demo-1.json')
      try {
        await fs.access(demoKioskPath)
        console.log('Demo kiosk already exists, skipping initialization')
      } catch {
        await saveKioskToFile(initialKioskData["demo-1"])
        console.log('Created initial demo kiosk')
      }
    }
  } catch (error) {
    console.error('Error initializing data:', error)
    process.exit(1)
  }
}

init() 