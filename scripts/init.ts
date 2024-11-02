import { promises as fs } from 'fs'
import path from 'path'

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
    "sections": []
  }
}

async function init() {
  const dataDir = path.join(process.cwd(), 'data')
  const dataFile = path.join(dataDir, 'kiosks.json')

  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(dataDir, { recursive: true })
    
    // Check if kiosks.json exists
    try {
      await fs.access(dataFile)
      console.log('Data file already exists, skipping initialization')
    } catch {
      // Create initial kiosks.json if it doesn't exist
      await fs.writeFile(dataFile, JSON.stringify(initialKioskData, null, 2))
      console.log('Created initial kiosks.json with demo data')
    }
  } catch (error) {
    console.error('Error initializing data:', error)
    process.exit(1)
  }
}

init() 