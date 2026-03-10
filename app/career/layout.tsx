import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Careers at Spodia – Join India\'s Fastest-Growing Online Hotel Booking Platform',
  description: 'Build your career with Spodia. Explore opportunities in tech, operations, sales, marketing & customer support. Work with a passionate travel-tech team.',
  keywords: 'Spodia careers, jobs at Spodia, travel tech jobs India, hotel booking jobs, OTA jobs India, Spodia hiring, tech careers India, sales jobs Spodia, customer support jobs travel, hotel industry jobs, operations job India, marketing jobs travel, startup jobs India, join Spodia, career opportunities, travel company jobs, software engineer jobs travel, hotel partner relationship jobs, travel customer service jobs, business development travel jobs, hospitality careers, hotel sales jobs, remote jobs India travel, Spodia recruitment, HR jobs travel, company hiring Spodia, jobs in Guwahati travel, Spodia team, work at Spodia, job vacancies travel, operations manager travel, booking platform jobs, travel technology hiring, career openings Spodia',
  openGraph: {
    title: 'Careers at Spodia – Travel Tech Job Opportunities',
    description: 'Join Spodia and build your career in India\'s fast-growing travel and hotel booking industry. Explore job openings across departments.',
    url: 'https://spodia.com/careers',
    images: [
      {
        url: 'https://spodia.com/assets/images/og-careers.jpg',
        alt: 'Careers at Spodia',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Spodia – Join Our Team',
    description: 'Explore the latest job openings at Spodia across tech, sales, operations & marketing.',
    images: ['https://spodia.com/assets/images/og-careers.jpg'],
    site: '@Spodiaasia',
  },
  alternates: {
    canonical: 'https://spodia.com/careers',
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Script
        id="career-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Spodia',
            url: 'https://spodia.com',
            sameAs: [
              'https://www.facebook.com/spodiaasia',
              'https://www.instagram.com/spodiaasia',
              'https://x.com/Spodiaasia',
              'https://www.youtube.com/@Spodiaasia',
            ],
            logo: 'https://spodia.com/assets/images/logo.png',
          }),
        }}
      />
    </>
  );
}
