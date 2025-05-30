export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Return Policy</h1>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-6">Last updated: March 15, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Return Window</h2>
            <p className="mb-4">
              We accept returns within 30 days of delivery for most items. To be eligible for a return, your item must be:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>In the same condition that you received it</li>
              <li>Unused and in the original packaging</li>
              <li>Accompanied by the original receipt or proof of purchase</li>
              <li>Not a final sale or clearance item</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Return Process</h2>
            <p className="mb-4">To return an item, please follow these steps:</p>
            <ol className="list-decimal pl-6 mb-4">
              <li>Log into your account and initiate a return request</li>
              <li>Print the return shipping label</li>
              <li>Pack the item securely with all original packaging</li>
              <li>Drop off the package at the nearest shipping location</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Refunds</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Refunds will be processed within 5-7 business days after receiving the return</li>
              <li>Original shipping charges are non-refundable</li>
              <li>Refunds will be issued to the original payment method</li>
              <li>You will receive an email notification when your refund is processed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Non-Returnable Items</h2>
            <p className="mb-4">The following items cannot be returned:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Perishable goods</li>
              <li>Intimate or sanitary goods</li>
              <li>Downloadable software products</li>
              <li>Gift cards</li>
              <li>Items marked as "Final Sale" or "Non-Returnable"</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Damaged or Defective Items</h2>
            <p className="mb-4">
              If you receive a damaged or defective item, please contact us immediately. We will provide a prepaid return label and process a replacement or refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
            <p className="mb-4">
              For questions about returns, please contact our customer service:
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