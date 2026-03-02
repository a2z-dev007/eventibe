import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Details | Homocation Asia Private Limited",
  description:
    "Official company details, registration information, and corporate overview of Homocation Asia Private Limited, the parent company of Eventibe.com and VenueForEvent.com.",
};

export default function CompanyDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
