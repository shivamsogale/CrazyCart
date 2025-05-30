import { createServerClient } from "@/lib/supabase/server"
import ProductCard from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Star, Shield, Truck, HeadphonesIcon } from "lucide-react"

export default async function HomePage() {
  const supabase = createServerClient()

  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .limit(8)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
    }

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto fade-in-up">
              <h1 className="text-6xl md:text-8xl font-bold mb-8 gradient-text leading-tight whitespace-nowrap">
                Shop Now
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Discover extraordinary products that blend innovation with elegance. Your perfect purchase awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/products">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl group"
                  >
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 rounded-full text-lg font-semibold border-2 hover:bg-purple-50 transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 floating-animation"></div>
          <div
            className="absolute bottom-20 right-10 w-16 h-16 bg-pink-200 rounded-full opacity-60 floating-animation"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-20 w-12 h-12 bg-blue-200 rounded-full opacity-60 floating-animation"
            style={{ animationDelay: "2s" }}
          ></div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Why Choose CrazyCart?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience shopping reimagined with our commitment to quality, speed, and exceptional service.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Star, title: "Premium Quality", desc: "Curated products that exceed expectations" },
                { icon: Truck, title: "Fast Delivery", desc: "Lightning-fast shipping to your doorstep" },
                { icon: Shield, title: "Secure Shopping", desc: "Your data protected with enterprise security" },
                { icon: HeadphonesIcon, title: "24/7 Support", desc: "Always here when you need assistance" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-center group stagger-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 fade-in-up">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Featured Collection</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked products that represent the pinnacle of design and functionality.
              </p>
            </div>

            {error && <div className="text-center text-red-600 mb-8">Error loading products: {error.message}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products?.map((product, index) => (
                <div key={product.id} className="stagger-animation" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {!products?.length && !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products available at the moment.</p>
              </div>
            )}

            <div className="text-center mt-16 fade-in-up">
              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 rounded-full text-lg font-semibold border-2 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                >
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error("Homepage error:", error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 gradient-text">Something went wrong</h1>
          <p className="text-gray-600 text-lg">Please try refreshing the page</p>
        </div>
      </div>
    )
  }
}
