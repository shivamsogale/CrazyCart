import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function SetupInstructions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Supabase environment variables are not configured. Please follow the setup instructions below.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
          <CardDescription>Follow these steps to configure your shopping website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. Create Supabase Project</h3>
            <p className="text-muted-foreground">
              Go to{" "}
              <a href="https://supabase.com" className="text-primary hover:underline">
                supabase.com
              </a>{" "}
              and create a new project.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Get API Credentials</h3>
            <p className="text-muted-foreground">
              In your Supabase dashboard, go to Settings → API to find your project URL and anon key.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Create Environment File</h3>
            <p className="text-muted-foreground mb-2">
              Create a <code className="bg-muted px-1 rounded">.env.local</code> file in your project root:
            </p>
            <pre className="bg-muted p-4 rounded text-sm">
              {`NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. Run Database Schema</h3>
            <p className="text-muted-foreground">
              Copy and run the SQL from <code className="bg-muted px-1 rounded">database-schema.sql</code> in your
              Supabase SQL editor.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">5. Create Admin User</h3>
            <p className="text-muted-foreground">
              Sign up for an account, then manually update the user's role to 'admin' in the profiles table.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
