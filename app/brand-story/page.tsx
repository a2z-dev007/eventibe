import type { Metadata } from "next";
import BrandStoryClient from "./BrandStoryClient";

export const metadata: Metadata = {
  title: "Brand Story | Eventibe – Discover the Energy Behind Every Event",
  description:
    "The cinematic brand story of Eventibe.com — where every event finds its energy. Discover our mission, vision, and the purpose behind India's premier corporate venue and event marketplace.",
};

export default function BrandStoryPage() {
  return <BrandStoryClient />;
}
