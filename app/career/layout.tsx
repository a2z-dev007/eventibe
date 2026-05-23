import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Careers at Eventibe – Join India\'s Fastest-Growing Online Hotel Booking Platform',
  description: 'Build your career with Eventibe. Explore opportunities in tech, operations, sales, marketing & customer support. Work with a passionate travel-tech team.',
  keywords: 'Eventibe careers, jobs at Eventibe, travel tech jobs India, hotel booking jobs, OTA jobs India, Eventibe hiring, tech careers India, sales jobs Eventibe, customer support jobs travel, hotel industry jobs, operations job India, marketing jobs travel, startup jobs India, join Eventibe, career opportunities, travel company jobs, software engineer jobs travel, hotel partner relationship jobs, travel customer service jobs, business development travel jobs, hospitality careers, hotel sales jobs, remote jobs India travel, Eventibe recruitment, HR jobs travel, company hiring Eventibe, jobs in Guwahati travel, Eventibe team, work at Eventibe, job vacancies travel, operations manager travel, booking platform jobs, travel technology hiring, career openings Eventibe',
  openGraph: {
    title: 'Careers at Eventibe – Travel Tech Job Opportunities',
    description: 'Join Eventibe and build your career in India\'s fast-growing travel and hotel booking industry. Explore job openings across departments.',
    url: 'https://eventibe.com/careers',
    images: [
      {
        url: 'https://eventibe.com/assets/images/og-careers.jpg',
        alt: 'Careers at Eventibe',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at Eventibe – Join Our Team',
    description: 'Explore the latest job openings at Eventibe across tech, sales, operations & marketing.',
    images: ['https://eventibe.com/assets/images/og-careers.jpg'],
    site: '@Eventibeasia',
  },
  alternates: {
    canonical: 'https://eventibe.com/careers',
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
            name: 'Eventibe',
            url: 'https://eventibe.com',
            sameAs: [
              'https://www.facebook.com/eventibeasia',
              'https://www.instagram.com/eventibeasia',
              'https://x.com/Eventibeasia',
              'https://www.youtube.com/@Eventibeasia',
            ],
            logo: 'https://eventibe.com/assets/images/logo.png',
          }),
        }}
      />
    </>
  );
}
