import { Metadata } from 'next';
import Script from 'next/script';
import FAQPageClient from './FAQPageClient';

export const metadata: Metadata = {
    title: 'Eventibe FAQs – Quick Answers for Events & Stays | Booking Help & Support',
    description: 'Find clear and accurate answers to the most common questions about Eventibe. Learn how online booking, payments, cancellations, refunds, GST invoices, and event venue listing works.',
    keywords: 'Eventibe FAQs, Eventibe help, Eventibe support, event booking FAQs, online venue booking help, Eventibe questions, booking cancellation FAQs, refund FAQs, GST invoice FAQs, property listing FAQs, host support, guest support, payment FAQs, booking confirmation help, hotel extranet FAQs, Eventibe India, travel FAQs, booking assistance, venue partner help, online travel platform, room booking help, how Eventibe works, account help, app FAQs, Eventibe mobile FAQs, customer service FAQs, venue onboarding, support center, reservation FAQs, booking policy FAQs, travel support, accommodation help, guest questions, venue partner questions, eventibe.com FAQs',
    openGraph: {
        title: 'Eventibe FAQs – Quick Answers for Events & Stays',
        description: 'Clear answers to the most common guest and venue partner questions at Eventibe.',
        url: 'https://eventibe.com/faqs',
        siteName: 'Eventibe',
        images: [
            {
                url: 'https://eventibe.com/assets/images/og-faqs.jpg',
                alt: 'Eventibe FAQs',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Eventibe FAQs – Guest & Venue Partner Help Center',
        description: 'Find answers to all common questions related to booking, payments, refunds, and venue management on Eventibe.',
        images: ['https://eventibe.com/assets/images/og-faqs.jpg'],
        site: '@Eventibehq',
    },
    alternates: {
        canonical: 'https://eventibe.com/faqs',
    },
};

export default function FAQPage() {
    return (
        <>
            <FAQPageClient />
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        name: 'Eventibe Frequently Asked Questions',
                        url: 'https://eventibe.com/faqs',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'How does Eventibe booking work?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Guests can book venues and stays instantly on Eventibe.com and receive automatic confirmation. Partners receive booking alerts via email, WhatsApp, and dashboard notifications.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'How do I cancel or modify a booking?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Guests can modify or cancel bookings through the My Bookings section or by contacting support@eventibe.com.',
                                },
                            },
                        ],
                    }),
                }}
            />
        </>
    );
}
