import { ConfigurableKiosk } from '@/components/configurable-kiosk'

export default function KioskPage({ params }: { params: { id: string } }) {
  return <ConfigurableKiosk kioskId={params.id} />
} 