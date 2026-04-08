'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Loader2 } from 'lucide-react'

export default function SigninPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [isPhoneStep, setIsPhoneStep] = useState(false)
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)

  // Email/Password signin
  const handleEmailSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Signin error:', err)
      let errorMsg = 'Failed to sign in'
      
      if (err.code === 'auth/invalid-api-key') {
        errorMsg = 'Firebase configuration error'
      } else if (err.code === 'auth/user-not-found') {
        errorMsg = 'Email not found'
      } else if (err.code === 'auth/wrong-password') {
        errorMsg = 'Wrong password'
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'Invalid email address'
      } else if (err.message) {
        errorMsg = err.message
      }
      
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  // Google signin
  const handleGoogleSignin = async () => {
    setError('')
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (err: any) {
      console.error('Google signin error:', err)
      if (err.code !== 'auth/popup-closed-by-user') {
        let errorMsg = 'Google sign in failed'
        if (err.code === 'auth/invalid-api-key') {
          errorMsg = 'Firebase configuration error'
        } else if (err.message) {
          errorMsg = err.message
        }
        setError(errorMsg)
      }
    } finally {
      setLoading(false)
    }
  }

  // Phone signin - send OTP
  const handlePhoneSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      })

      const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
      setConfirmationResult(result)
      setIsPhoneStep(true)
    } catch (err: any) {
      console.error('Phone OTP error:', err)
      let errorMsg = 'Failed to send OTP'
      if (err.code === 'auth/invalid-phone-number') {
        errorMsg = 'Invalid phone number format'
      } else if (err.code === 'auth/invalid-api-key') {
        errorMsg = 'Firebase configuration error'
      } else if (err.message) {
        errorMsg = err.message
      }
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  // Phone signin - verify OTP
  const handlePhoneVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!confirmationResult) throw new Error('No OTP verification in progress')
      await confirmationResult.confirm(otp)
      router.push('/dashboard')
    } catch (err: any) {
      console.error('OTP verification error:', err)
      let errorMsg = 'Failed to verify OTP'
      if (err.code === 'auth/invalid-verification-code') {
        errorMsg = 'Invalid OTP code'
      } else if (err.message) {
        errorMsg = err.message
      }
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }


  if (isPhoneStep) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verify Phone Number</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handlePhoneVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <Input
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="000000"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify OTP
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  setIsPhoneStep(false)
                  setOtp('')
                  setConfirmationResult(null)
                }}
                disabled={loading}
              >
                Back
              </Button>
            </form>
            <div id="recaptcha-container"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleEmailSignin} className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={loading}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || !email || !password}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In with Email
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          {/* Google */}
          <Button
            onClick={handleGoogleSignin}
            variant="outline"
            className="w-full"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Google
          </Button>

          {/* Phone */}
          <form onSubmit={handlePhoneSendOTP} className="space-y-2">
            <label className="block text-sm font-medium">Or with Phone</label>
            <div className="flex gap-2">
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1234567890"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !phone} className="whitespace-nowrap">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Send OTP
              </Button>
            </div>
          </form>

          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:text-blue-600">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
