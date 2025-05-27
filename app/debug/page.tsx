export default function DebugPage() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "***HIDDEN***" : undefined,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? "***HIDDEN***" : undefined,
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Environment Variables Debug</h1>
      <div className="bg-muted p-4 rounded">
        <pre>{JSON.stringify(envVars, null, 2)}</pre>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Check which environment variables are available. The SUPABASE_URL and SUPABASE_ANON_KEY should be set by the
        Vercel integration.
      </p>
    </div>
  )
}
