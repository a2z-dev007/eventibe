export const metadata = {
  title: 'Frequently Asked Questions | Eventibe',
  description: 'Find answers to common questions about using Eventibe.',
};

export default function FAQsPage() {
  const faqs = [
    {
      question: "Is Eventibe free to use for event organizers?",
      answer: "Yes, Eventibe is completely free for corporate event planners and organizers to search, compare, and send inquiries to venues and vendors."
    },
    {
      question: "How do I book a venue?",
      answer: "Currently, Eventibe operates on an inquiry-driven model. You find a venue you like, fill out the inquiry form on their profile, and the venue's event team will contact you directly with a quote and availability."
    },
    {
      question: "Are the prices listed on the website final?",
      answer: "The prices listed are indicative starting prices or ranges provided by the venues and vendors. Final pricing depends on your specific event requirements, date, and guest count."
    },
    {
      question: "Can I list my own venue or service?",
      answer: "Absolutely! We are always looking to partner with premium corporate venues and service providers. Visit our 'List Your Venue' or 'List Your Service' pages to get started."
    },
    {
      question: "What types of events can I plan using Eventibe?",
      answer: "Eventibe specializes in corporate events, including conferences, seminars, board meetings, product launches, team offsites, and corporate gala dinners."
    }
  ];

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-primary-navy mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-primary-navy mb-3">{faq.question}</h3>
              <p className="text-soft-slate">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
