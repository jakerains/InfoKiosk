import { ConfigurableKiosk } from '@/components/configurable-kiosk'
import { loadKioskFromFile } from '@/lib/kiosk-storage'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { id: string }
}

export default async function KioskPage({ params }: PageProps) {
  try {
    const { id } = params
    const kiosk = await loadKioskFromFile(id)
    if (!kiosk) {
      notFound()
    }
    return <ConfigurableKiosk kioskId={id} />
  } catch (error) {
    notFound()
  }
} 