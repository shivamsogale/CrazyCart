"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useCallback, useState } from "react"

export default function SearchInput() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term)
      const params = new URLSearchParams()
      if (term) {
        params.set("q", term)
      }
      router.push(`/products?${params.toString()}`)
    },
    [router]
  )

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-10 w-full"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  )
}