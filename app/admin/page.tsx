'use client'

import React, { useState, useEffect } from 'react'
import { KioskConfig } from '@/types/kiosk'
import { Button } from '@/components/ui/button'
import { PlusCircle, Trash2, ArrowLeft, ExternalLink, Copy } from 'lucide-react'
import { KioskEditor } from '@/components/admin/kiosk-editor'
import { StrictMode } from 'react'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'

export default function AdminPageWrapper() {
  return (
    <StrictMode>
      <AdminPage />
    </StrictMode>
  )
}

function AdminPage() {
  const [kiosks, setKiosks] = useState<Record<string, KioskConfig>>({})
  const [selectedKioskId, setSelectedKioskId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchKiosks();
    // This effect should only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchKiosks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/kiosks')
      const data = await response.json()
      setKiosks(data)
      if (!selectedKioskId && Object.keys(data).length > 0) {
        setSelectedKioskId(Object.keys(data)[0])
      }
    } catch (error) {
      console.error('Error fetching kiosks:', error)
      toast({
        title: "Error",
        description: "Failed to load kiosks",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKioskSelect = (kioskId: string) => {
    console.log('Selecting kiosk:', kioskId)
    setSelectedKioskId(kioskId)
  }

  const deleteKiosk = async (kioskId: string) => {
    try {
      const response = await fetch(`/api/kiosks/${kioskId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete kiosk')
      }

      setKiosks(prev => {
        const newKiosks = { ...prev }
        delete newKiosks[kioskId]
        return newKiosks
      })

      if (selectedKioskId === kioskId) {
        setSelectedKioskId(null)
      }

      toast({
        title: "Success",
        description: "Kiosk deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting kiosk:', error)
      toast({
        title: "Error",
        description: "Failed to delete kiosk",
        variant: "destructive",
      })
    }
  }

  const createNewKiosk = async () => {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const newId = `kiosk-${timestamp}-${randomString}`
    
    const newKiosk: KioskConfig = {
      id: newId,
      name: "NEW KIOSK",
      headerTitle: "NEW KIOSK",
      headerSubtitle: "Enter subtitle",
      backgroundWords: ["WORD1", "WORD2", "WORD3", "WORD4"],
      mainTitle: "Enter main title",
      mainDescription: "Enter main description",
      showPoweredBy: true,
      footerText: "Powered by GenAIJake",
      mainIcon: "Cpu",
      infoBox1: {
        title: "Info Box 1",
        content: ["Item 1", "Item 2"]
      },
      infoBox2: {
        title: "Info Box 2",
        content: ["Item 1", "Item 2"]
      },
      sections: []
    }
    
    await saveNewKiosk(newKiosk)
    setKiosks(prev => ({ ...prev, [newId]: newKiosk }))
    setSelectedKioskId(newId)
  }

  const duplicateKiosk = async (kioskId: string) => {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const newId = `kiosk-${timestamp}-${randomString}`
    
    // Create a deep copy of the kiosk and update its name
    const originalKiosk = kiosks[kioskId]
    const duplicatedKiosk: KioskConfig = {
      ...JSON.parse(JSON.stringify(originalKiosk)),
      id: newId,
      name: `${originalKiosk.name} (Copy)`,
      headerTitle: `${originalKiosk.headerTitle} (Copy)`
    }
    
    await saveNewKiosk(duplicatedKiosk)
    setKiosks(prev => ({ ...prev, [newId]: duplicatedKiosk }))
    setSelectedKioskId(newId)
    
    toast({
      title: "Success",
      description: "Kiosk duplicated successfully",
    })
  }

  const exportKiosk = async (kioskId: string) => {
    if (!kioskId) return;
    window.location.href = `/api/kiosks/export/${kioskId}`;
  };

  const importKiosk = async (file: File) => {
    try {
      const content = await file.text();
      const kioskData = JSON.parse(content);
      
      const response = await fetch('/api/kiosks/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kioskData),
      });

      if (!response.ok) throw new Error('Failed to import kiosk');
      
      const importedKiosk = await response.json();
      setKiosks(prev => ({
        ...prev,
        [importedKiosk.id]: importedKiosk
      }));
      
      toast({
        title: "Success",
        description: "Kiosk imported successfully",
      });
    } catch (error) {
      console.error('Error importing kiosk:', error);
      toast({
        title: "Error",
        description: "Failed to import kiosk",
        variant: "destructive",
      });
    }
  };

  const saveNewKiosk = async (newKiosk: KioskConfig) => {
    try {
      const response = await fetch(`/api/kiosks/${newKiosk.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKiosk),
      });

      if (!response.ok) throw new Error('Failed to save kiosk');
      
      await fetchKiosks(); // Refresh the list
    } catch (error) {
      console.error('Error saving kiosk:', error);
      toast({
        title: "Error",
        description: "Failed to save kiosk",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-lg">Loading kiosks...</div>
      </div>
    )
  }

  if (Object.keys(kiosks).length === 0) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-red-500">No kiosks created yet</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Kiosk Admin</h1>
          </div>
          <div className="flex gap-2 mb-4">
            <Button onClick={createNewKiosk}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Kiosk
            </Button>
            <Button
              variant="outline"
              onClick={() => exportKiosk(selectedKioskId)}
              disabled={!selectedKioskId}
            >
              Export Kiosk
            </Button>
            <div>
              <input
                type="file"
                accept=".json"
                className="hidden"
                id="import-kiosk"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) importKiosk(file);
                  // Reset the input
                  e.target.value = '';
                }}
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('import-kiosk')?.click()}
              >
                Import Kiosk
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center p-4">Loading kiosks...</div>
            ) : Object.keys(kiosks).length === 0 ? (
              <div className="text-center text-muted-foreground">
                No kiosks created yet
              </div>
            ) : (
              Object.entries(kiosks).map(([id, kiosk]) => (
                <div key={`kiosk-item-${id}`} className="flex items-center gap-2">
                  <Button
                    variant={selectedKioskId === id ? "default" : "outline"}
                    className="flex-1 justify-start text-left"
                    onClick={() => handleKioskSelect(id)}
                  >
                    <span className="truncate">{kiosk.name}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      duplicateKiosk(id)
                    }}
                    title="Duplicate Kiosk"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteKiosk(id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-3">
            {selectedKioskId && kiosks[selectedKioskId] ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">
                    Editing: {kiosks[selectedKioskId].name}
                  </h2>
                  <Link
                    href={`/kiosk/${selectedKioskId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Launch Kiosk
                    </Button>
                  </Link>
                </div>
                <KioskEditor
                  key={selectedKioskId}
                  kiosk={kiosks[selectedKioskId]}
                  onSave={async (updatedKiosk) => {
                    try {
                      const response = await fetch(`/api/kiosks/${selectedKioskId}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedKiosk),
                      })

                      if (!response.ok) throw new Error('Failed to update kiosk')

                      setKiosks(prev => ({
                        ...prev,
                        [selectedKioskId]: updatedKiosk
                      }))

                      toast({
                        title: "Success",
                        description: "Kiosk updated successfully",
                      })
                    } catch (error) {
                      console.error('Error updating kiosk:', error)
                      toast({
                        title: "Error",
                        description: "Failed to update kiosk",
                        variant: "destructive",
                      })
                    }
                  }}
                />
              </div>
            ) : (
              <div className="text-center text-muted-foreground p-8">
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div>Select a kiosk to edit or create a new one</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 