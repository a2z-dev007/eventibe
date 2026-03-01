import { BASE_URL } from './apiClient';
import axios, { AxiosRequestConfig } from 'axios';

// Temporary static token for events API - will be removed when API becomes public
const EVENTS_API_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcyMTMxMDg5LCJpYXQiOjE3NzIwNDQ2ODksImp0aSI6IjQyNzBlYWFmYWFjNjRkYTViYzA0NmExMDEyMzhiNTkyIiwidXNlcl9pZCI6Mn0.RZVp6JPPiuM5-CPB8aZKzHzfrksYfRNGieEpdEunxAE';

/** Shared API request function with Bearer token */
async function eventsApiGet<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axios.get<T>(`${BASE_URL}${endpoint}`, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${EVENTS_API_TOKEN}`,
      ...config?.headers,
    },
    timeout: 30000,
  });
  return response.data;
}

/** Shared POST function for events API */
async function eventsApiPost<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await axios.post<T>(`${BASE_URL}${endpoint}`, data, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${EVENTS_API_TOKEN}`,
      ...config?.headers,
    },
    timeout: 30000,
  });
  return response.data;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VenueTypeRecord {
  id: number;
  name: string;
  name_hindi: string;
  description: string;
  file: string;
  key_name: string;
  created: string;
  created_by: number;
}

export interface VenueTypesResponse {
  totalRecords: number;
  status: string;
  records: VenueTypeRecord[];
}

export interface EventTypeRecord {
  id: number;
  name: string;
  name_hindi: string;
  description: string;
  file: string;
  key_name: string;
  created: string;
  created_by: number;
}

export interface EventTypesResponse {
  totalRecords: number;
  status: string;
  records: EventTypeRecord[];
}

export interface VenueRecord {
  id: number;
  name: string;
  description: string;
  order: number;
  listing: number;
  venue_type: number;
  event_type: number;
  address: string;
  city_id: number;
  city_name: string;
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
  country_short_name: string;
  lat: number;
  lon: number;
  is_hotel_venue: boolean;
  contact_details?: any[];
  venue_services?: number[];
  services_details?: any[];
  venue_cuisines?: number[];
  cuisine_details?: any[];
  venue_facilities?: number[];
  facilities_details?: any[];
  venue_highlights?: number[];
  highlights_details?: any[];
  package_details?: any[];
  images: Array<{
    id: number;
    file: string;
    cover_photo: boolean;
    order: number;
    images_tag: string[];
    status: number;
    status_remark: string | null;
  }>;
  [key: string]: unknown;
}

export interface VenuesResponse {
  status: string;
  records: VenueRecord[];
  totalRecords: number;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

/** 
 * Search venues with filters 
 * API: /venues/?page_number=1&number_of_records=10&city=371&venue_type=1&event_type=12
 */
export async function searchVenues(params: {
  page_number?: number;
  number_of_records?: number;
  city?: string | number;
  venue_type?: string | number;
  event_type?: string | number;
}): Promise<VenuesResponse> {
  const queryParams = new URLSearchParams();
  if (params.page_number) queryParams.set('page_number', String(params.page_number));
  if (params.number_of_records) queryParams.set('number_of_records', String(params.number_of_records));
  if (params.city) queryParams.set('city', String(params.city));
  if (params.venue_type) queryParams.set('venue_type', String(params.venue_type));
  if (params.event_type) queryParams.set('event_type', String(params.event_type));

  return eventsApiGet<VenuesResponse>(`/venues/?${queryParams.toString()}`);
}

/** Fetch venue types for "Explore Venue Types" section */
export async function fetchVenueTypes(params?: { page_number?: number; number_of_records?: number }): Promise<VenueTypesResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page_number) queryParams.set('page_number', String(params.page_number));
  if (params?.number_of_records) queryParams.set('number_of_records', String(params.number_of_records));
  const queryString = queryParams.toString();
  return eventsApiGet<VenueTypesResponse>(`/venue-types${queryString ? '/?' + queryString : ''}`);
}

/** Fetch event types for "Event Type" dropdown */
export async function fetchEventTypes(params?: { page_number?: number; number_of_records?: number }): Promise<EventTypesResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page_number) queryParams.set('page_number', String(params.page_number));
  if (params?.number_of_records) queryParams.set('number_of_records', String(params.number_of_records));
  const queryString = queryParams.toString();
  return eventsApiGet<EventTypesResponse>(`/event-types${queryString ? '/?' + queryString : ''}`);
}

/** Fetch venues by venue type - used for Premium Banquet Halls, Wedding, Corporate sections */
export async function fetchVenues(params: { venue_type: number }): Promise<VenuesResponse> {
  const searchParams = new URLSearchParams({
    venue_type: String(params.venue_type),
  });
  return eventsApiGet<VenuesResponse>(`/venues?${searchParams.toString()}`);
}

/** Fetch a single venue by ID */
export async function fetchVenueById(id: number | string): Promise<VenuesResponse> {
  return eventsApiGet<VenuesResponse>(`/venues?id=${id}`);
}

/** Fetch all venues (simplified for dropdowns) */
export async function fetchVenuesList(): Promise<VenuesResponse> {
  return eventsApiGet<VenuesResponse>('/venues/?page_number=1&number_of_records=100');
}

/** Submit event enquiry */
export async function addEventEnquiry(data: {
  venue: number[];
  guest_name: string;
  guest_mobile: string;
  guest_email: string;
  event_type: number;
  event_start_date: string;
  event_end_date: string;
  no_of_guests: number;
  message: string;
  meal_preference: string;
  page_url: string;
}): Promise<any> {
    // The user provided a specific endpoint for enquiry
    // We'll use the eventsApiPost but handle the endpoint explicitly
    return eventsApiPost('/event-enquiry/add/', data);
}
