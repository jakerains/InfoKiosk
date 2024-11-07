import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Kiosk Not Found</h2>
        <p className="text-muted-foreground">The requested kiosk could not be found.</p>
        <Link href="/admin">
          <Button variant="outline">Return to Admin</Button>
        </Link>
      </div>
    </div>
  )
}
