import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
              <span className="text-background font-bold">SL</span>
            </div>
            <span className="font-semibold text-2xl">CampusXchange</span>
          </Link>
        </div>

        <Card className="border-border">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
            <CardDescription>Something went wrong during authentication. Please try again.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/auth/login" className="block">
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90">Try Again</Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
