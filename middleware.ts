import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define static paths that should be ignored by the middleware
const staticPaths = [
  '/_next',
  '/static',
  '/api',
  '/404',
  '/500',
  '/_error',
  '/_not-found',
  '/favicon.ico',
  '/manifest.json',
  '/robots.txt'
]

export async function middleware(request: NextRequest) {
  // Check if the current path should be handled by middleware
  const shouldHandlePath = !staticPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Return early for static paths
  if (!shouldHandlePath) {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - Static files and assets
     * - API routes
     * - Error pages
     * - System files
     */
    '/((?!_next|static|api|public|404|500|_error|_not-found|favicon.ico|manifest.json|robots.txt).*)',
  ],
} 