'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { User as LucideUser, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from '@/lib/supabase/client'
import LogoutButton from "./logout-button"
import CartButton from "../cart/cart-button"
import SearchInput from "../search/search-input"
import SearchDialog from "../search/search-dialog"
import { User } from '@supabase/supabase-js'

interface Profile {
  id: string
  role: string
  [key: string]: any
}

export default function ClientHeader() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
          setProfile(profile)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/CrazyCart.png" alt="CrazyCart Logo" width={40} height={40} className="rounded-lg" />
          <span className="text-2xl font-bold">CrazyCart</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6 flex-1 justify-center max-w-2xl">
          <SearchInput />
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          {profile?.role === "admin" && (
            <Link href="/admin" className="hover:text-primary">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <SearchDialog />
          {user ? (
            <>
              <CartButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <LucideUser className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <LucideUser className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">
                      <Settings className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  {profile?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 