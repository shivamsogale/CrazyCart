export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <p className="mb-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4">
            At ShopNext, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information</li>
            <li>Shipping and billing addresses</li>
            <li>Payment information</li>
            <li>Order history</li>
            <li>Device information and IP address</li>
            <li>Browsing behavior on our website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders</li>
            <li>Send promotional offers and newsletters (with your consent)</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="mb-4">We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Shipping partners to deliver your orders</li>
            <li>Payment processors to handle transactions</li>
            <li>Service providers who assist our operations</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Encryption of sensitive data</li>
            <li>Secure servers and networks</li>
            <li>Regular security assessments</li>
            <li>Limited access to personal information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Lodge a complaint with supervisory authorities</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
          <p className="mb-4">
            We use cookies and similar technologies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            For privacy-related inquiries or to exercise your rights, please contact us at:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: privacy@shopnext.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Address: 123 Shopping Street, Mumbai, Maharashtra 400001</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 