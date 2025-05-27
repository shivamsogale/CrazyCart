import { createClient } from "./supabase/server"

export async function getUser() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error getting user:", error)
    return null
  }
}

export async function getUserProfile() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    return profile
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

export async function isAdmin() {
  try {
    const profile = await getUserProfile()
    return profile?.role === "admin"
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}
