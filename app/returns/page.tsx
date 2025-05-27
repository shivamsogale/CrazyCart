export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Returns & Refunds Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Policy Overview</h2>
          <p className="mb-4">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, we accept returns within 30 days of delivery for most items.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Eligibility</h2>
          <p className="mb-4">To be eligible for a return, your item must be:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Unused and in the same condition that you received it</li>
            <li>In the original packaging</li>
            <li>Accompanied by the original receipt or proof of purchase</li>
            <li>Returned within 30 days of delivery</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
          <p className="mb-4">The following items cannot be returned:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal care items</li>
            <li>Opened software or digital products</li>
            <li>Gift cards</li>
            <li>Customized or personalized items</li>
            <li>Items marked as non-returnable on the product page</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Initiate a return request through your account or contact customer support</li>
            <li>Receive a return authorization and shipping label</li>
            <li>Pack the item securely in its original packaging</li>
            <li>Attach the shipping label and send the package</li>
            <li>Track your return through your account</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refunds are processed within 5-7 business days of receiving the returned item</li>
            <li>Original shipping charges are non-refundable</li>
            <li>Refund will be issued to the original payment method</li>
            <li>You will receive an email notification when your refund is processed</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Items</h2>
          <p className="mb-4">
            If you receive a damaged or defective item, please contact us within 48 hours of delivery. We will arrange for a replacement or refund at no additional cost.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our Returns & Refunds policy, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email: returns@shopnext.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Working hours: Monday to Saturday, 9 AM to 6 PM IST</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 