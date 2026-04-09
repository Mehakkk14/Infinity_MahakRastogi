"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Check, Smartphone } from "lucide-react"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number", test: (p: string) => /\d/.test(p) },
]

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [showPhoneDialog, setShowPhoneDialog] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  })

  const isPasswordValid = passwordRequirements.every((req) => req.test(formData.password))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!auth) {
        setError("Firebase not initialized. Please refresh the page.")
        setIsLoading(false)
        return
      }

      if (!isPasswordValid) {
        setError("Password does not meet requirements")
        setIsLoading(false)
        return
      }

      await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      router.push("/dashboard")
    } catch (err: any) {
      let errorMessage = "Failed to create account"
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Email is already in use"
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak"
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address"
      }
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError(null)
    setIsLoading(true)
    try {
      if (!auth) {
        setError("Firebase not initialized. Please refresh the page.")
        setIsLoading(false)
        return
      }
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/dashboard")
    } catch (err: any) {
      let errorMessage = "Failed to sign up with Google"
      if (err.code !== "auth/popup-closed-by-user") {
        setError(errorMessage)
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Logo className="h-8 w-8 text-cyan-500" />
            <span className="text-2xl font-bold tracking-tight text-foreground">LegalEase AI</span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Start analyzing legal documents with AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">Toggle password visibility</span>
                    </Button>
                  </div>
                  {formData.password && (
                    <div className="mt-2 space-y-1.5">
                      {passwordRequirements.map((req) => (
                        <div
                          key={req.label}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded-full ${
                              req.test(formData.password)
                                ? "bg-green-500/20 text-green-500"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Check className="h-3 w-3" />
                          </div>
                          <span
                            className={
                              req.test(formData.password)
                                ? "text-green-500"
                                : "text-muted-foreground"
                            }
                          >
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Field>
              </FieldGroup>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !formData.email || !formData.name || !isPasswordValid}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                type="button"
                onClick={() => setShowPhoneDialog(true)}
                disabled={isLoading}
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Phone
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>

            {/* Phone Sign Up Dialog */}
            <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign up with Phone Number</DialogTitle>
                  <DialogDescription>
                    Enter your phone number to create an account. Make sure to include your country code (e.g., +1 for US).
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                  />
                  <p className="text-xs text-muted-foreground">
                    Note: Phone verification requires setting a password. After verification, you can sign in with your phone number or email.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowPhoneDialog(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setShowPhoneDialog(false)
                        setError("Phone authentication is coming soon!")
                      }}
                      className="flex-1"
                      disabled={isLoading || !phoneNumber.trim()}
                    >
                      Continue with Phone
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
