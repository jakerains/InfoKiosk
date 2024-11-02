'use client'

import { useState, useEffect } from 'react'
import { KioskConfig } from '@/types/kiosk'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { KioskEditor } from '@/components/admin/kiosk-editor'

export default function AdminPage() {
  const [kiosks, setKiosks] = useState<Record<string, KioskConfig>>({})
  const [selectedKioskId, setSelectedKioskId] = useState<string | null>(null)

  useEffect(() => {
    fetchKiosks()
  }, [])

  const fetchKiosks = async () => {
    const response = await fetch('/api/kiosks')
    const data = await response.json()
    setKiosks(data)
  }

  const createNewKiosk = () => {
    const newId = `kiosk-${Object.keys(kiosks).length + 1}`
    const newKiosk: KioskConfig = {
      id: newId,
      name: "New Kiosk",
      headerTitle: "WELCOME TO THE NEW KIOSK",
      headerSubtitle: "Customize your kiosk",
      backgroundWords: ["INNOVATE", "CONNECT", "INSPIRE", "THRIVE"],
      footerText: "Powered by GenAIJake",
      sections: [
        {
          title: "Introduction",
          content: ["Welcome to your new kiosk setup."]
        }
      ],
      // ... other necessary default fields
    }
    setKiosks(prev => ({ ...prev, [newId]: newKiosk }))
    setSelectedKioskId(newId)
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Kiosk Admin</h1>
          <Button onClick={createNewKiosk}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Kiosk
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1 space-y-4">
            {Object.values(kiosks).map((kiosk) => (
              <div
                key={kiosk.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedKioskId === kiosk.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card hover:bg-muted'
                }`}
                onClick={() => setSelectedKioskId(kiosk.id)}
              >
                <h3 className="font-medium">{kiosk.name}</h3>
                <p className="text-sm opacity-70">{kiosk.id}</p>
              </div>
            ))}
          </div>

          <div className="col-span-3">
            {selectedKioskId && (
              <KioskEditor
                kiosk={kiosks[selectedKioskId]}
                onSave={async (updatedKiosk) => {
                  const response = await fetch(`/api/kiosks/${selectedKioskId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedKiosk),
                  })
                  if (response.ok) {
                    setKiosks(prev => ({
                      ...prev,
                      [selectedKioskId]: updatedKiosk
                    }))
                  } else {
                    // Handle save error
                    console.error('Failed to save kiosk configuration.')
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 