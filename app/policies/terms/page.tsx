export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-6">Last updated: March 15, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using CrazyCart, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>You must be at least 18 years old to create an account</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to provide accurate and complete information</li>
              <li>We reserve the right to suspend or terminate accounts</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Product Information</h2>
            <p className="mb-4">
              We strive to provide accurate product information, but we do not warrant that product descriptions or prices are accurate, complete, or current. We reserve the right to modify prices and availability without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Orders and Payment</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>All orders are subject to acceptance and availability</li>
              <li>Prices are in Indian Rupees (₹) and include applicable taxes</li>
              <li>Payment must be made at the time of order</li>
              <li>We accept major credit cards and other payment methods as specified</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Shipping costs are calculated at checkout</li>
              <li>Risk of loss passes to you upon delivery</li>
              <li>You are responsible for providing accurate shipping information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-none mb-4">
              <li>Email: crazycart@gmail.com</li>
              <li>Phone: +917448234341</li>
              <li>Address: Mumbai, Maharashtra, India</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
} 