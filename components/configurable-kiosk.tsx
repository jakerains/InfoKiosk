'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import { KioskConfig } from '@/types/kiosk'

interface ConfigurableKioskProps {
  kioskId: string;
}

export function ConfigurableKiosk({ kioskId }: ConfigurableKioskProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [secondarySection, setSecondarySection] = useState(1) // For the second box
  const [config, setConfig] = useState<KioskConfig | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    fetch(`/api/kiosks/${kioskId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch kiosk data')
        return res.json()
      })
      .then(data => setConfig(data))
      .catch(err => setError(err.message))
  }, [kioskId])

  useEffect(() => {
    if (!config?.sections || config.sections.length === 0) return
    
    const timer = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % config.sections.length)
      setSecondarySection((prev) => ((prev + 1) % config.sections.length))
    }, 5000)

    return () => clearInterval(timer)
  }, [config])

  if (error || !config) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 flex items-center justify-center">
      <Card className="bg-black/40 backdrop-blur-sm border border-emerald-900/20">
        <CardContent className="p-6">{error || 'Loading...'}</CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {config.backgroundWords?.map((word, index) => (
          <div
            key={index}
            className="absolute text-8xl font-bold"
            style={{
              top: `${25 * index}%`,
              left: `${25 * index}%`,
              transform: 'rotate(-45deg)',
              color: 'transparent',
              WebkitTextStroke: '1px',
              WebkitTextStrokeImage: 'linear-gradient(45deg, #47ebb3, #eb4747)',
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="mb-8 relative z-10">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text animate-gradient bg-[size:200%] bg-[linear-gradient(90deg,#4285f4_0%,#9c5fff_30%,#e94a87_60%,#22c55e_100%)] tracking-wider">
          {config.headerTitle}
        </h1>
      </header>

      {/* Main Content - Responsive Layout */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Main Box - Full width on mobile, 2/3 on desktop */}
        <section className="lg:col-span-2">
          <Card className="h-full bg-black/40 backdrop-blur-sm border border-emerald-900/20">
            <CardContent className="h-full flex flex-col justify-center p-6">
              <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                {config.mainTitle}
              </h2>
              <p className="text-xl text-gray-300">
                {config.mainDescription}
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Right Side / Bottom Boxes Container */}
        <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-6">
          {/* First Box */}
          <Card className="bg-black/40 backdrop-blur-sm border border-emerald-900/20">
            <CardContent className="h-full flex flex-col justify-center p-6">
              <AnimatePresence mode="wait">
                {isClient && config.sections && config.sections.length > 0 && (
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                      {config.sections[activeSection].title}
                    </h3>
                    <ul className="list-disc list-inside text-xl text-gray-300">
                      {config.sections[activeSection].content.map((item, index) => (
                        <li key={index} className="mb-2">{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Second Box */}
          <Card className="bg-black/40 backdrop-blur-sm border border-emerald-900/20">
            <CardContent className="h-full flex flex-col justify-center p-6">
              <AnimatePresence mode="wait">
                {isClient && config.sections && config.sections.length > 0 && (
                  <motion.div
                    key={secondarySection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                      {config.sections[secondarySection].title}
                    </h3>
                    <ul className="list-disc list-inside text-xl text-gray-300">
                      {config.sections[secondarySection].content.map((item, index) => (
                        <li key={index} className="mb-2">{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="mt-8 text-center relative z-10">
        {config.showPoweredBy && (
          <p className="text-lg text-gray-400">{config.footerText}</p>
        )}
      </footer>
    </div>
  )
}