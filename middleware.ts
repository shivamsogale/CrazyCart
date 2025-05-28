import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Skip middleware for static pages and assets
  const publicPatterns = [
    '/_next',
    '/static',
    '/api',
    '/404',
    '/500',
    '/favicon.ico',
    '/manifest.json',
    '/robots.txt'
  ]

  if (publicPatterns.some(pattern => request.nextUrl.pathname.startsWith(pattern))) {
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
     * Match all request paths except for the ones starting with:
     * - _next
     * - static files
     * - api routes
     * - public files
     * - error pages
     */
    '/((?!_next|static|api|public|404|500|favicon.ico|manifest.json|robots.txt).*)',
  ],
} 