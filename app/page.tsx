'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { KioskConfig } from '@/types/kiosk'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [kiosks, setKiosks] = useState<Record<string, KioskConfig>>({})
  const router = useRouter()

  useEffect(() => {
    fetch('/api/kiosks')
      .then(res => res.json())
      .then(data => setKiosks(data))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            Kiosk Displays
          </h1>
          <p className="text-gray-300">Select a kiosk to view in full screen</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(kiosks).map((kiosk) => (
            <motion.div
              key={kiosk.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="bg-black/40 backdrop-blur-sm border border-emerald-900/20 cursor-pointer hover:border-emerald-500/50 transition-colors"
                onClick={() => router.push(`/kiosk/${kiosk.id}`)}
              >
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                    {kiosk.name}
                  </h2>
                  <p className="text-gray-400 mb-4">{kiosk.mainDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    {kiosk.backgroundWords.map((word, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-emerald-900/20 rounded-md text-emerald-400 text-sm"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/admin" 
            className="inline-flex items-center px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-md transition-colors"
          >
            Manage Kiosks →
          </a>
        </div>
      </div>
    </div>
  )
}