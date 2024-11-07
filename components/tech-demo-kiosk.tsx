'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'

export function TechDemoKiosk() {
  const [activeSection, setActiveSection] = useState(0)

  const sections = [
    {
      title: "Tech Stack",
      content: ["React", "Next.js", "TypeScript", "TensorFlow.js"]
    },
    {
      title: "Use Cases",
      content: ["Natural Language Processing", "Image Recognition", "Predictive Analytics"]
    },
    {
      title: "Partners",
      content: ["TechCorp Inc.", "AI Innovations Ltd.", "DataSphere Solutions"]
    },
    {
      title: "Demo Info",
      content: ["Showcasing cutting-edge AI capabilities", "Seamless integration possibilities", "Real-time data processing"]
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [sections.length])

  const backgroundWords = ['INNOVATE', 'CONNECT', 'INSPIRE', 'THRIVE']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {backgroundWords.map((word, index) => (
          <div
            key={index}
            className="absolute text-8xl font-bold"
            style={{
              top: `${25 * index}%`,
              left: `${25 * index}%`,
              transform: 'rotate(-45deg)',
              color: 'transparent',
              WebkitTextStroke: '1px',
              WebkitTextFillColor: 'linear-gradient(45deg, #47ebb3, #eb4747)',
            }}
          >
            {word}
          </div>
        ))}
      </div>

      <header className="mb-12 relative z-10">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text animate-gradient bg-[size:200%] bg-[linear-gradient(90deg,#4285f4_0%,#9c5fff_30%,#e94a87_60%,#22c55e_100%)] tracking-wider">
          INNOVATION LAB
        </h1>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <section className="lg:col-span-2">
          <Card className="h-full bg-black/40 backdrop-blur-sm border border-emerald-900/20">
            <CardContent className="h-full flex flex-col justify-center p-6">
              <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                Build with cutting-edge technology
              </h2>
              <p className="text-xl text-gray-300">
                Experience the power of our latest innovations in AI and machine learning.
                Our demo showcases real-time processing, advanced analytics, and seamless integration capabilities.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="lg:col-span-1">
          <Card className="h-full bg-black/40 backdrop-blur-sm border border-emerald-900/20 overflow-hidden">
            <CardContent className="h-full flex flex-col justify-center p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="space-y-4"
                >
                  <motion.h3 
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"
                    layout
                  >
                    {sections[activeSection].title}
                  </motion.h3>
                  <motion.ul 
                    className="list-disc list-inside text-xl text-gray-300 space-y-3"
                    layout
                  >
                    {sections[activeSection].content.map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="opacity-80 hover:opacity-100 transition-opacity"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="mt-8 text-center relative z-10">
        <p className="text-lg text-gray-400">Powering the future of AI technology</p>
      </footer>
    </div>
  )
}