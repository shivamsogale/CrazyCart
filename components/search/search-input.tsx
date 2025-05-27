"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useCallback, useTransition } from "react"
import { Button } from "@/components/ui/button"

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (term) {
        params.set("q", term)
      } else {
        params.delete("q")
      }

      startTransition(() => {
        router.push(`/products?${params.toString()}`)
      })
    },
    [router, searchParams]
  )

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-10 w-full"
        defaultValue={searchParams.get("q") || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
} 