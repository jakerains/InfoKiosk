import { ConfigurableKiosk } from '@/components/configurable-kiosk'

export default function KioskPage({ params }: { params: { id: string } }) {
  const kioskId = params.id.toString()
  return <ConfigurableKiosk kioskId={kioskId} />
} 