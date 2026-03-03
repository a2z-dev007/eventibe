import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Eventibe - Your Privacy Matters",
  description:
    "Review the Privacy Policy for Eventibe.com and VenueForEvent.com. Learn how we collect, use, and protect your personal information.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
