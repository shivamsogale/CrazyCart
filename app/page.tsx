import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import ProductList from "@/components/products/product-list"

export default async function Home() {
  let featuredProducts = []

  try {
    const supabase = await createClient()
    const { data } = await supabase.from("products").select("*").eq("is_active", true).limit(8)
    featuredProducts = data || []
  } catch (error) {
    console.error("Error loading products:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to CrazyCart</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, secure delivery.
        </p>
        <Button asChild size="lg">
          <Link href="/products">Shop Now</Link>
        </Button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Fast Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Get your orders delivered quickly and safely to your doorstep.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Secure Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Shop with confidence using our secure payment system.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>24/7 Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Our customer support team is here to help you anytime.</p>
          </CardContent>
        </Card>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <ProductList products={featuredProducts} />
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Setup Instructions */}
      {featuredProducts.length === 0 && (
        <section className="text-center py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Setup Required</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-4">
              <p>To get started with your shopping website, please:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Create a Supabase project at{" "}
                  <a href="https://supabase.com" className="text-primary hover:underline">
                    supabase.com
                  </a>
                </li>
                <li>Copy your project URL and anon key from the API settings</li>
                <li>
                  Create a <code className="bg-muted px-1 rounded">.env.local</code> file with your Supabase credentials
                </li>
                <li>Run the database schema in your Supabase SQL editor</li>
                <li>Create an admin user and add some products</li>
              </ol>
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  )
}
