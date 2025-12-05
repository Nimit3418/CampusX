import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function SignUpSuccessPage() {
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
            <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-foreground" />
            </div>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We sent you a confirmation link. Please check your inbox and verify your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              {"Didn't receive the email? Check your spam folder or try signing up again."}
            </p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
