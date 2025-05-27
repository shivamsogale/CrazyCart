import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), UPI, Net Banking, and popular digital wallets. All transactions are secure and encrypted."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary by location. Typically, orders are delivered within 3-5 business days for metro cities and 5-7 business days for other locations in India."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some restrictions apply to certain product categories."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within India. We plan to expand our shipping services to other countries in the future."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the courier's website."
    },
    {
      question: "Are the products genuine?",
      answer: "Yes, all products sold on CrazyCart are 100% genuine. We source directly from authorized distributors and manufacturers."
    },
    {
      question: "Do you offer warranty on products?",
      answer: "Warranty terms vary by product and manufacturer. Most electronics come with a standard manufacturer warranty. Specific warranty information is listed on each product page."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team through email at support@crazycart.com, phone at +91 98765 43210, or by using the contact form on our website."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
} 