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
    "verticalLayout": false,
    "rotationSpeed": 5
  },
  "ai-pc-demo": {
    "id": "ai-pc-demo",
    "name": "AI PC Demonstration",
    "headerTitle": "AI PC INNOVATION",
    "headerSubtitle": "Experience Next-Gen Computing",
    "backgroundWords": ["COMPUTE", "INNOVATE", "ANALYZE", "TRANSFORM"],
    "mainTitle": "AI PC Demonstration",
    "mainDescription": "Explore the capabilities of AI-powered PCs at the Innovation Lab. These machines are equipped with advanced NPUs (Neural Processing Units) that allow them to perform complex AI tasks, including computer vision, body tracking, and real-time analytics—all in a compact, accessible setup.",
    "showPoweredBy": true,
    "footerText": "Powered by Sterling Innovation",
    "mainIcon": "Cpu",
    "infoBox1": {
      "title": "Tech Stack",
      "content": [
        "NVIDIA NPU",
        "TensorFlow",
        "PyTorch",
        "Computer Vision APIs"
      ]
    },
    "infoBox2": {
      "title": "Applications",
      "content": [
        "Body Tracking",
        "Quality Control",
        "Real-time Analytics",
        "Edge Computing"
      ]
    },
    "sections": [
      {
        "title": "Real-Time Body Tracking",
        "content": [
          "Real-time analysis of human movement and gestures",
          "Applications in sports, fitness, and rehabilitation",
          "Highly accurate body tracking through AI-driven vision",
          "Innovative use cases in interactive experiences"
        ]
      },
      {
        "title": "Computer Vision for Quality Control",
        "content": [
          "Automated visual inspections for defects and anomalies",
          "Improving accuracy and reducing human error",
          "Rapid analysis for faster production cycles",
          "Cost-effective solutions for manufacturing quality assurance"
        ]
      }
    ],
    "rotationSpeed": 8,
    "verticalLayout": false
  },
  "digital-personalities": {
    "id": "digital-personalities",
    "name": "Digital Personalities Demo",
    "headerTitle": "DIGITAL PERSONALITIES",
    "headerSubtitle": "Next-Gen AI Interaction",
    "backgroundWords": ["ENGAGE", "INTERACT", "LEARN", "ADAPT"],
    "mainTitle": "Meet Our Digital Personalities",
    "mainDescription": "Explore the cutting-edge world of AI-driven digital personalities. These AI avatars bring an engaging, interactive element to the Innovation Lab, providing insights, answering questions, and showcasing advanced conversational capabilities in a fun and approachable way.",
    "showPoweredBy": true,
    "footerText": "Powered by Sterling Innovation",
    "mainIcon": "User",
    "infoBox1": {
      "title": "Technologies",
      "content": [
        "Natural Language Processing",
        "Speech Recognition",
        "Emotion Analysis",
        "Real-time Response"
      ]
    },
    "infoBox2": {
      "title": "Use Cases",
      "content": [
        "Customer Service",
        "Virtual Assistants",
        "Interactive Learning",
        "Brand Engagement"
      ]
    },
    "sections": [
      {
        "title": "Engaging Conversations",
        "content": [
          "Interactive AI avatars with personality-driven responses",
          "Real-time adaptation to user queries and interests",
          "Engaging, informative, and fun conversations",
          "Enhanced user interaction with dynamic responses"
        ]
      },
      {
        "title": "Personalized Information",
        "content": [
          "Personalized responses tailored to individual questions",
          "Detailed insights into technologies and demos in the lab",
          "Friendly, approachable AI that makes learning enjoyable",
          "Enhanced customization based on user interaction"
        ]
      }
    ],
    "rotationSpeed": 10,
    "verticalLayout": true
  },
  "innovation-lab": {
    "id": "innovation-lab",
    "name": "Sterling Innovation Lab",
    "headerTitle": "INNOVATION LAB",
    "headerSubtitle": "Discover the Future of Technology",
    "backgroundWords": ["INNOVATE", "DISCOVER", "CREATE", "TRANSFORM"],
    "mainTitle": "Welcome to the Sterling Innovation Lab",
    "mainDescription": "Discover the future of technology at the Sterling Technology Summit. Our Innovation Lab is divided into three unique sections, each showcasing how cutting-edge AI and machine learning can transform real-world operations and inspire creativity across industries.",
    "showPoweredBy": true,
    "footerText": "Powered by Sterling Innovation",
    "mainIcon": "Lab",
    "infoBox1": {
      "title": "Lab Sections",
      "content": [
        "Purpose-Driven Demos",
        "Interactive Playground",
        "Partner Showcase"
      ]
    },
    "infoBox2": {
      "title": "Technologies",
      "content": [
        "Artificial Intelligence",
        "Computer Vision",
        "Edge Computing",
        "Digital Personalities"
      ]
    },
    "sections": [
      {
        "title": "Purpose-Driven Demo: Rivertown Ball Company",
        "content": [
          "AI-powered quality checks ensure consistent product standards",
          "Predictive maintenance minimizes equipment downtime",
          "Real-time analytics provide actionable insights for efficiency"
        ]
      },
      {
        "title": "Playground: Interactive Demos",
        "content": [
          "Custom ball design using AI tools for personalization",
          "Interactive digital personalities offering unique experiences",
          "Hands-on demonstrations showcasing AI-driven creativity"
        ]
      }
    ],
    "rotationSpeed": 12,
    "verticalLayout": false
  },
  "jetson-demo": {
    "id": "jetson-demo",
    "name": "Edge AI with Jetson",
    "headerTitle": "EDGE AI COMPUTING",
    "headerSubtitle": "Powered by NVIDIA Jetson",
    "backgroundWords": ["EDGE", "COMPUTE", "PROCESS", "ANALYZE"],
    "mainTitle": "AI at the Edge with Jetson",
    "mainDescription": "Experience the power of AI at the edge with NVIDIA Jetson. These compact, energy-efficient devices bring advanced AI capabilities directly to edge applications, enabling real-time data processing, intelligent decision-making, and enhanced device control without relying on cloud connectivity.",
    "showPoweredBy": true,
    "footerText": "Powered by NVIDIA Jetson",
    "mainIcon": "Chip",
    "infoBox1": {
      "title": "Tech Stack",
      "content": [
        "NVIDIA Jetson",
        "CUDA",
        "TensorRT",
        "DeepStream SDK"
      ]
    },
    "infoBox2": {
      "title": "Applications",
      "content": [
        "Edge AI",
        "Robotics",
        "Smart Cameras",
        "Industrial IoT"
      ]
    },
    "sections": [
      {
        "title": "Edge AI Processing",
        "content": [
          "On-device AI for faster processing and lower latency",
          "Ideal for use in environments with limited connectivity",
          "Reduces dependency on cloud infrastructure for real-time tasks",
          "Enhanced privacy by keeping data processing local"
        ]
      },
      {
        "title": "AI for Robotics",
        "content": [
          "Real-time object detection and recognition",
          "Autonomous navigation and decision-making capabilities",
          "Integration with sensors for obstacle detection and avoidance",
          "Used in drones, robotic arms, and autonomous vehicles"
        ]
      }
    ],
    "rotationSpeed": 8,
    "verticalLayout": true
  },
  "ball-customizer": {
    "id": "ball-customizer",
    "name": "Rivertown Ball Customizer",
    "headerTitle": "BALL CUSTOMIZER",
    "headerSubtitle": "Design Your Perfect Ball",
    "backgroundWords": ["DESIGN", "CREATE", "CUSTOMIZE", "PLAY"],
    "mainTitle": "Rivertown Ball Customizer",
    "mainDescription": "Design the custom ball of your dreams with the Rivertown Ball Customizer. Using the latest in Generative AI, this demo allows users to create personalized ball designs, showcasing the capabilities of AI in creative design and customization.",
    "showPoweredBy": true,
    "footerText": "Powered by Rivertown Ball Co.",
    "mainIcon": "Palette",
    "infoBox1": {
      "title": "Features",
      "content": [
        "Real-time 3D Preview",
        "Pattern Generation",
        "Color Customization",
        "Logo Integration"
      ]
    },
    "infoBox2": {
      "title": "Technologies",
      "content": [
        "Generative AI",
        "Three.js",
        "WebGL",
        "Real-time Rendering"
      ]
    },
    "sections": [
      {
        "title": "Create Your Own Design",
        "content": [
          "Select from a variety of colors and textures",
          "Add logos, graphics, and custom patterns",
          "Real-time preview of your customizations",
          "User-friendly interface for easy designing"
        ]
      },
      {
        "title": "Generative AI in Action",
        "content": [
          "AI-driven suggestions to enhance your designs",
          "Instant rendering of custom graphics",
          "Adaptive learning to match user preferences",
          "Creativity enhanced with AI-powered features"
        ]
      }
    ],
    "rotationSpeed": 10,
    "verticalLayout": false
  },
  "cv-counter": {
    "id": "cv-counter",
    "name": "AI People Counter",
    "headerTitle": "PEOPLE COUNTER",
    "headerSubtitle": "Real-Time Visitor Analytics",
    "backgroundWords": ["COUNT", "ANALYZE", "MONITOR", "OPTIMIZE"],
    "mainTitle": "AI-Powered People Counter",
    "mainDescription": "Experience the effectiveness of our AI-powered people counting system, designed to provide accurate real-time insights into visitor traffic. Using advanced computer vision and AI algorithms, this system is capable of counting individuals as they enter or exit an area, providing valuable data for a range of applications.",
    "showPoweredBy": true,
    "footerText": "Powered by Sterling Innovation",
    "mainIcon": "Users",
    "infoBox1": {
      "title": "Features",
      "content": [
        "Real-time Counting",
        "Analytics Dashboard",
        "Occupancy Tracking",
        "Alert System"
      ]
    },
    "infoBox2": {
      "title": "Applications",
      "content": [
        "Retail Analytics",
        "Venue Management",
        "Safety Compliance",
        "Traffic Analysis"
      ]
    },
    "sections": [
      {
        "title": "Real-Time Visitor Counting",
        "content": [
          "Accurate real-time counting of visitors",
          "Uses computer vision for precise detection",
          "Ideal for monitoring entrances and exits",
          "Ensures accurate data even during peak hours"
        ]
      },
      {
        "title": "Applications in Retail",
        "content": [
          "Understand customer flow and peak hours",
          "Optimize staffing based on visitor traffic",
          "Measure the impact of promotions and events",
          "Improve store layout based on visitor behavior"
        ]
      }
    ],
    "rotationSpeed": 8,
    "verticalLayout": true
  },
  "quality-control": {
    "id": "quality-control",
    "name": "CV Quality Control",
    "headerTitle": "QUALITY CONTROL",
    "headerSubtitle": "AI-Powered Inspection",
    "backgroundWords": ["INSPECT", "DETECT", "ANALYZE", "IMPROVE"],
    "mainTitle": "Computer Vision Quality Control Demo",
    "mainDescription": "Explore how AI-powered Computer Vision (CV) is revolutionizing quality control in manufacturing. This demo showcases how advanced CV algorithms can inspect products in real-time, ensuring consistent quality and reducing errors in the production process.",
    "showPoweredBy": true,
    "footerText": "Powered by Sterling Innovation",
    "mainIcon": "Eye",
    "infoBox1": {
      "title": "Features",
      "content": [
        "Real-time Inspection",
        "Defect Detection",
        "Quality Metrics",
        "Process Analytics"
      ]
    },
    "infoBox2": {
      "title": "Industries",
      "content": [
        "Manufacturing",
        "Electronics",
        "Automotive",
        "Consumer Goods"
      ]
    },
    "sections": [
      {
        "title": "Real-Time Defect Detection",
        "content": [
          "Automatic detection of product defects",
          "Minimize errors by identifying inconsistencies instantly",
          "Supports a wide range of products and defect types",
          "Improves production efficiency with immediate feedback"
        ]
      },
      {
        "title": "Applications in Manufacturing",
        "content": [
          "Automated visual inspections for multiple industries",
          "Improves the accuracy of quality control",
          "Reduces the need for manual checks, saving labor costs",
          "Ideal for electronics, automotive, textiles, and more"
        ]
      }
    ],
    "rotationSpeed": 10,
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
      // Create all kiosks from initialKioskData
      for (const [id, kiosk] of Object.entries(initialKioskData)) {
        const kioskPath = path.join(KIOSKS_DIR, `${id}.json`)
        try {
          await fs.access(kioskPath)
          console.log(`Kiosk ${id} already exists, skipping`)
        } catch {
          await saveKioskToFile(kiosk)
          console.log(`Created kiosk: ${id}`)
        }
      }
    }
  } catch (error) {
    console.error('Error initializing data:', error)
    process.exit(1)
  }
}

init() 