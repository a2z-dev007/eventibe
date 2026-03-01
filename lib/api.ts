import citiesData from '@/data/cities.json';
import venuesData from '@/data/venues.json';
import vendorsData from '@/data/vendors.json';

// --- Internal Fake DB Functions (used from JSON files) ---

export interface City {
  id: number;
  name: string;
  slug: string;
}

export interface Venue {
  id: number;
  name: string;
  slug: string;
  city: string;
  type: string;
  capacity: number;
  price_range: string;
  amenities: string[];
  description: string;
  images: string[];
  rating?: number;
  reviews?: number;
}

export interface Vendor {
  id: number;
  name: string;
  slug: string;
  category: string;
  city: string;
  description: string;
  services: string[];
  images: string[];
  rating?: number;
  price_range?: string;
}

export async function getCities(): Promise<City[]> {
  return citiesData;
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  return citiesData.find((c) => c.slug === slug);
}

export async function getVenues(filters?: { city?: string; type?: string }): Promise<Venue[]> {
  let filtered = venuesData;
  if (filters?.city) {
    filtered = filtered.filter((v) => v.city === filters.city);
  }
  if (filters?.type) {
    filtered = filtered.filter((v) => v.type === filters.type);
  }
  return filtered;
}

export async function getVenueBySlug(slug: string): Promise<Venue | undefined> {
  return venuesData.find((v) => v.slug === slug);
}

export async function getVendors(filters?: { city?: string; category?: string }): Promise<Vendor[]> {
  let filtered = vendorsData;
  if (filters?.city) {
    filtered = filtered.filter((v) => v.city === filters.city);
  }
  if (filters?.category) {
    filtered = filtered.filter((v) => v.category === filters.category);
  }
  return filtered;
}

export async function getVendorBySlug(slug: string): Promise<Vendor | undefined> {
  return vendorsData.find((v) => v.slug === slug);
}

// --- Spodia Event Live APIs (for HeroSearch) ---
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://stgbackend.spodia.com/api';

export async function fetchEventTypes() {
  try {
    const res = await fetch(`${API_BASE_URL}/event/types/`, {
      method: "GET",
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { records: [] };
    return res.json();
  } catch (error) {
    console.error("Error fetching event types:", error);
    return { records: [] };
  }
}

export async function fetchVenueTypes() {
  try {
    const res = await fetch(`${API_BASE_URL}/venue/types/`, {
      method: "GET",
      next: { revalidate: 3600 }
    });
    if (!res.ok) return { records: [] };
    return res.json();
  } catch (error) {
    console.error("Error fetching venue types:", error);
    return { records: [] };
  }
}
