import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Eventibe - We’re Here to Help",
  description:
    "Get in touch with the Eventibe team for support, partnerships, or venue inquiries. We’re here to make your event planning journey smooth and efficient.",
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
