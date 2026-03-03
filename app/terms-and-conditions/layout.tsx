import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Eventibe - Legal Agreement",
  description:
    "Read the Terms and Conditions for using Eventibe.com and VenueForEvent.com. Understand your rights and responsibilities when using our platform.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
