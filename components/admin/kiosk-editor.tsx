'use client'

import { useState } from 'react'
import { KioskConfig, KioskSection } from '@/types/kiosk'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Minus, Save } from 'lucide-react'
import * as Icons from 'lucide-react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Checkbox } from "@/components/ui/checkbox"

interface KioskEditorProps {
  kiosk: KioskConfig
  onSave: (kiosk: KioskConfig) => Promise<void>
}

export function KioskEditor({ kiosk, onSave }: KioskEditorProps) {
  const [editedKiosk, setEditedKiosk] = useState<KioskConfig>(kiosk)
  const [saving, setSaving] = useState(false)

  const updateField = (field: keyof KioskConfig, value: any) => {
    setEditedKiosk(prev => ({ ...prev, [field]: value }))
  }

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
    newSections[sectionIndex].content = newSections[sectionIndex].content
      .filter((_, i) => i !== itemIndex)
    updateField('sections', newSections)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(editedKiosk)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={editedKiosk.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('name', e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Header Title</label>
              <Input
                value={editedKiosk.headerTitle}
                onChange={e => updateField('headerTitle', e.target.value)}
              />
            </div>
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPoweredBy"
              checked={editedKiosk.showPoweredBy}
              onCheckedChange={(checked) => updateField('showPoweredBy', checked)}
            />
            <label 
              htmlFor="showPoweredBy" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show "Powered by" text
            </label>
          </div>

          {editedKiosk.showPoweredBy && (
            <div>
              <label className="text-sm font-medium">Footer Text</label>
              <Input
                value={editedKiosk.footerText}
                onChange={e => updateField('footerText', e.target.value)}
              />
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Info Box 1</h3>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editedKiosk.infoBox1.title}
                onChange={e => updateField('infoBox1', { 
                  ...editedKiosk.infoBox1, 
                  title: e.target.value 
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Items</label>
              {editedKiosk.infoBox1.content.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={e => {
                      const newContent = [...editedKiosk.infoBox1.content]
                      newContent[index] = e.target.value
                      updateField('infoBox1', {
                        ...editedKiosk.infoBox1,
                        content: newContent
                      })
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newContent = editedKiosk.infoBox1.content.filter((_, i) => i !== index)
                      updateField('infoBox1', {
                        ...editedKiosk.infoBox1,
                        content: newContent
                      })
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  updateField('infoBox1', {
                    ...editedKiosk.infoBox1,
                    content: [...editedKiosk.infoBox1.content, 'New Item']
                  })
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Info Box 2</h3>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editedKiosk.infoBox2.title}
                onChange={e => updateField('infoBox2', { 
                  ...editedKiosk.infoBox2, 
                  title: e.target.value 
                })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Items</label>
              {editedKiosk.infoBox2.content.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={e => {
                      const newContent = [...editedKiosk.infoBox2.content]
                      newContent[index] = e.target.value
                      updateField('infoBox2', {
                        ...editedKiosk.infoBox2,
                        content: newContent
                      })
                    }}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newContent = editedKiosk.infoBox2.content.filter((_, i) => i !== index)
                      updateField('infoBox2', {
                        ...editedKiosk.infoBox2,
                        content: newContent
                      })
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  updateField('infoBox2', {
                    ...editedKiosk.infoBox2,
                    content: [...editedKiosk.infoBox2.content, 'New Item']
                  })
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Main Icon</label>
            <Select
              value={editedKiosk.mainIcon}
              onValueChange={(value) => updateField('mainIcon', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(Icons)
                  .filter(key => key !== 'createLucideIcon')
                  .map(iconName => (
                    <SelectItem key={iconName} value={iconName}>
                      <div className="flex items-center gap-2">
                        {React.createElement(Icons[iconName as keyof typeof Icons], { className: 'w-4 h-4' })}
                        {iconName}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
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
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addContentItem(sectionIndex)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
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
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
} 