import LoginForm from "@/components/auth/login-form"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <LoginForm />
        <p className="text-center mt-4 text-sm text-muted-foreground">
          {"Don't have an account? "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  )
}
