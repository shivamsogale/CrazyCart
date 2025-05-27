"use client"

import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <button onClick={handleLogout} className="flex items-center w-full">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </button>
  )
}
