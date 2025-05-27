export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Shipping Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Delivery Timeframes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Metro Cities: 3-5 business days</li>
            <li>Other Cities: 5-7 business days</li>
            <li>Remote Areas: 7-10 business days</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shipping Costs</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Free shipping on orders above ₹999</li>
            <li>Standard shipping: ₹49 for orders below ₹999</li>
            <li>Express shipping available at additional cost</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
          <p className="mb-4">
            Once your order is shipped, you will receive a tracking number via email and SMS. You can track your order:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Through your ShopNext account</li>
            <li>Using the tracking number on our website</li>
            <li>Via the courier partner's website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Shipping Partners</h2>
          <p className="mb-4">
            We work with trusted courier partners including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>BlueDart</li>
            <li>DTDC</li>
            <li>Delhivery</li>
            <li>FedEx</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Important Notes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Orders are processed within 24 hours on business days</li>
            <li>Delivery times may vary during peak seasons and sales</li>
            <li>Some remote areas might have longer delivery times</li>
            <li>We currently only ship within India</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            For any shipping-related queries, please contact our customer support:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Email: shipping@shopnext.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Working hours: Monday to Saturday, 9 AM to 6 PM IST</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 