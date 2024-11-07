'use client'

import { useState } from 'react'
import { KioskConfig, KioskSection } from '@/types/kiosk'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Minus } from 'lucide-react'

interface KioskEditorProps {
  kiosk: KioskConfig
  onSave: (kiosk: KioskConfig) => Promise<void>
}

export function KioskEditor({ kiosk, onSave }: KioskEditorProps) {
  const [editedKiosk, setEditedKiosk] = useState({
    ...kiosk,
    rotationSpeed: kiosk.rotationSpeed ?? 5,
  });

  const [saving, setSaving] = useState(false)

  const updateField = (field: string, value: any) => {
    setEditedKiosk(prev => ({ ...prev, [field]: value }));
  };

  const updateSection = (index: number, field: keyof KioskSection, value: any) => {
    const newSections = [...editedKiosk.sections]
    newSections[index] = { ...newSections[index], [field]: value }
    updateField('sections', newSections)
  }

  const addSection = () => {
    updateField('sections', [
      ...editedKiosk.sections,
      { title: 'New Section', content: ['New Item'] }
    ])
  }

  const removeSection = (index: number) => {
    const newSections = editedKiosk.sections.filter((_, i) => i !== index)
    updateField('sections', newSections)
  }

  const addContentItem = (sectionIndex: number) => {
    const newSections = [...editedKiosk.sections]
    newSections[sectionIndex].content.push('New Item')
    updateField('sections', newSections)
  }

  const removeContentItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...editedKiosk.sections]
    newSections[sectionIndex].content = newSections[sectionIndex].content.filter(
      (_, i) => i !== itemIndex
    )
    updateField('sections', newSections)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(editedKiosk)
    } catch (error) {
      console.error('Error saving kiosk:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Kiosk Name</label>
            <Input
              value={editedKiosk.name}
              onChange={e => updateField('name', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Header Title</label>
            <Input
              value={editedKiosk.headerTitle}
              onChange={e => updateField('headerTitle', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Header Subtitle</label>
            <Input
              value={editedKiosk.headerSubtitle}
              onChange={e => updateField('headerSubtitle', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Background Words</label>
            <Input
              value={editedKiosk.backgroundWords.join(', ')}
              onChange={e => updateField('backgroundWords', e.target.value.split(', '))}
              placeholder="Enter words separated by commas"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Main Title</label>
            <Input
              value={editedKiosk.mainTitle}
              onChange={e => updateField('mainTitle', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Main Description</label>
            <Textarea
              value={editedKiosk.mainDescription}
              onChange={e => updateField('mainDescription', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Footer Text</label>
            <Input
              value={editedKiosk.footerText}
              onChange={e => updateField('footerText', e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Rotation Speed (seconds)</label>
            <Input
              type="number"
              value={editedKiosk.rotationSpeed}
              onChange={e => updateField('rotationSpeed', parseInt(e.target.value, 10) || 0)}
              min={1}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Sections</h3>
          <Button onClick={addSection} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </div>

        {editedKiosk.sections.map((section, sectionIndex) => (
          <Card key={sectionIndex}>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Section Title</label>
                    <Input
                      value={section.title}
                      onChange={e => updateSection(sectionIndex, 'title', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content Items</label>
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={e => {
                            const newContent = [...section.content]
                            newContent[itemIndex] = e.target.value
                            updateSection(sectionIndex, 'content', newContent)
                          }}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeContentItem(sectionIndex, itemIndex)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addContentItem(sectionIndex)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-4"
                  onClick={() => removeSection(sectionIndex)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
} 