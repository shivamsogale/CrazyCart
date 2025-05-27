export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4">
            Please read these Terms of Service carefully before using ShopNext. By accessing or using our service, you agree to be bound by these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Account Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must be 18 years or older to use this service</li>
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must notify us immediately of any unauthorized use of your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Product Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All product descriptions are accurate to the best of our knowledge</li>
            <li>We reserve the right to modify or discontinue products without notice</li>
            <li>Prices are subject to change without notice</li>
            <li>We do not guarantee product availability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All payments must be made in Indian Rupees</li>
            <li>We accept major credit cards, UPI, and net banking</li>
            <li>Payment information is encrypted and securely processed</li>
            <li>Orders are subject to verification and approval</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Shipping and Delivery</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Delivery times are estimates and not guaranteed</li>
            <li>We are not responsible for delays beyond our control</li>
            <li>Risk of loss transfers upon delivery to the carrier</li>
            <li>You are responsible for providing accurate shipping information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Returns and Refunds</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Returns must be initiated within 30 days of delivery</li>
            <li>Items must be unused and in original packaging</li>
            <li>Some items are not eligible for return</li>
            <li>Refunds will be issued to the original payment method</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All content on this website is our property</li>
            <li>You may not use our content without permission</li>
            <li>Product names and brands are property of their respective owners</li>
            <li>We respect intellectual property rights and expect users to do the same</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">
            We are not liable for any indirect, incidental, special, or consequential damages arising from your use of our service or products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
          <p className="mb-4">
            For questions about these Terms of Service, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: legal@shopnext.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: 123 Shopping Street, Mumbai, Maharashtra 400001</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 