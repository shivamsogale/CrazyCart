export const dynamic = 'force-static'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Welcome to CrazyCart, your premier destination for cutting-edge electronics and lifestyle products.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
        <p className="mb-4">
          Founded in 2024, CrazyCart emerged from a simple vision: to provide high-quality electronics and lifestyle products with exceptional customer service. What started as a small online store has grown into a trusted marketplace for tech enthusiasts and lifestyle shoppers alike.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          We strive to offer our customers the latest in technology and lifestyle products while maintaining the highest standards of customer service. Our commitment to quality, competitive pricing, and customer satisfaction sets us apart in the e-commerce landscape.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Curated Selection: We carefully select each product to ensure quality and value.</li>
          <li className="mb-2">Competitive Pricing: Get the best deals on premium products.</li>
          <li className="mb-2">Fast Shipping: Quick and reliable delivery across India.</li>
          <li className="mb-2">Expert Support: Our knowledgeable team is here to help you make informed decisions.</li>
          <li className="mb-2">Secure Shopping: Your security and privacy are our top priorities.</li>
        </ul>
      </div>
    </div>
  )
} 