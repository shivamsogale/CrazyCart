'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function NotFound() {
  useEffect(() => {
    // Initialize Supabase client on the client side
    const supabase = createClient()
    
    // Get session without blocking render
    const initializeAuth = async () => {
      await supabase.auth.getSession()
    }
    
    initializeAuth()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
      <p className="text-xl mb-8">Could not find the requested resource</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
      >
        Return Home
      </Link>
    </div>
  )
} 