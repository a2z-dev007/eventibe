import { BASE_URL } from './apiClient';
import axios, { AxiosRequestConfig } from 'axios';

/** Shared API request function */
async function eventsApiGet<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await axios.get<T>(`${BASE_URL}${endpoint}`, config);
  return response.data;
}

/** Shared POST function for events API */
async function eventsApiPost<T>(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await axios.post<T>(`${BASE_URL}${endpoint}`, data, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
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

export interface ContactDetail {
  id: number;
  name: string;
  email: string;
  mobile: string;
  contact_type: string;
}

export interface CuisineDetail {
  id: number;
  name: string;
  description: string;
  file: string | null;
  key_name: string | null;
  created: string;
  created_by: number;
}

export interface SDetail {
  id: number;
  name: string;
  created: string;
  created_by: number;
  description?: string;
}

export interface ImageRecord {
  id: number;
  file: string;
  cover_photo: boolean;
  images_tag: any[];
  order: number;
  status: number;
  status_remark: string | null;
}

export interface PackageDetail {
  id: number;
  venue: number;
  type: string | null;
  venue_name: string;
  file: string | null;
  key_name: string | null;
  name: string;
  suitable_for: string;
  price: string;
  description: string | null;
  created: string;
  status: boolean;
  status_remark: string | null;
  created_by: number;
}

export interface VideoRecord {
  id: number;
  title: string;
  video_url: string;
  status: boolean;
  status_remark: string | null;
  created: string;
  created_by: number;
}

export interface VenueRecord {
  id: number;
  name: string;
  description: string;
  order: number;
  listing: number;
  venue_type: number;
  event_type: number;
  contact_details?: ContactDetail[];
  venue_services?: number[];
  services_details?: SDetail[];
  venue_cuisines?: number[];
  cuisine_details?: CuisineDetail[];
  venue_amenities?: any[];
  amenities_details?: any[];
  venue_terms_conditions?: number[];
  terms_conditions_details?: SDetail[];
  venue_highlights?: number[];
  highlights_details?: SDetail[];
  package_details?: PackageDetail[];
  images?: ImageRecord[];
  videos?: VideoRecord[];
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
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
  meta_tags?: string;
  is_hotel_venue: boolean;
  venue_chain?: number;
  venue_configuration?: number;
  created?: string;
  created_by?: number;
  status?: boolean;
  status_remark?: string | null;
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
  venue_type?: string | number | number[];
  event_type?: string | number | number[];
}): Promise<VenuesResponse> {
  const queryParams = new URLSearchParams();
  if (params.page_number) queryParams.set('page_number', String(params.page_number));
  if (params.number_of_records) queryParams.set('number_of_records', String(params.number_of_records));
  if (params.city) queryParams.set('city', String(params.city));

  const formatArrayParam = (val: string | number | number[] | undefined) => {
    if (val === undefined || val === null || val === '') return null;
    if (Array.isArray(val)) return `[${val.join(',')}]`;
    const sVal = String(val);
    if (sVal.startsWith('[') && sVal.endsWith(']')) return sVal;
    return `[${sVal}]`;
  };

  const vType = formatArrayParam(params.venue_type);
  if (vType) queryParams.set('venue_type', vType);

  const eType = formatArrayParam(params.event_type);
  if (eType) queryParams.set('event_type', eType);

  const queryString = queryParams.toString()
    .replaceAll('%5B', '[')
    .replaceAll('%5D', ']');

  return eventsApiGet<VenuesResponse>(`/venues/list?${queryString}`);
}

/** Fetch venue types for "Explore Venue Types" section */
export async function fetchVenueTypes(params?: { page_number?: number; number_of_records?: number }): Promise<VenueTypesResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page_number) queryParams.set('page_number', String(params.page_number));
  if (params?.number_of_records) queryParams.set('number_of_records', String(params.number_of_records));
  const queryString = queryParams.toString();
  return eventsApiGet<VenueTypesResponse>(`/venue/types${queryString ? '/?' + queryString : ''}`);
}

/** Fetch event types for "Event Type" dropdown */
export async function fetchEventTypes(params?: { page_number?: number; number_of_records?: number }): Promise<EventTypesResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page_number) queryParams.set('page_number', String(params.page_number));
  if (params?.number_of_records) queryParams.set('number_of_records', String(params.number_of_records));
  const queryString = queryParams.toString();
  return eventsApiGet<EventTypesResponse>(`/event/types${queryString ? '/?' + queryString : ''}`);
}

/** Fetch venues by venue type - used for Premium Banquet Halls, Wedding, Corporate sections */
export async function fetchVenues(params: { venue_type: number | string | number[] }): Promise<VenuesResponse> {
  const formatArrayParam = (val: string | number | number[] | undefined) => {
    if (val === undefined || val === null || val === '') return '';
    if (Array.isArray(val)) return `[${val.join(',')}]`;
    const sVal = String(val);
    if (sVal.startsWith('[') && sVal.endsWith(']')) return sVal;
    return `[${sVal}]`;
  };

  const vType = formatArrayParam(params.venue_type);
  const searchParams = new URLSearchParams();
  if (vType) searchParams.set('venue_type', vType);

  const queryString = searchParams.toString()
    .replaceAll('%5B', '[')
    .replaceAll('%5D', ']');

  return eventsApiGet<VenuesResponse>(`/venues/list?${queryString}`);
}

/** Fetch a single venue by ID */
export async function fetchVenueById(id: number | string): Promise<VenuesResponse> {
  return eventsApiGet<VenuesResponse>(`/venues/list?id=${id}`);
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
