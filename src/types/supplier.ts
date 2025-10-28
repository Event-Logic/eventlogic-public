/**
 * TypeScript types for Supplier data
 * Based on supplier_schemas.py from supplier-collection backend
 */

export type MatchStatus = 'PENDING' | 'CONFIRMED' | 'NO_MATCH' | 'MANUAL_REVIEW';

export type SupplierStatus =
  | 'ready'
  | 'scraped'
  | 'scraped, fetched contacts'
  | 'auto-approved'
  | 'auto-approved-classification-done'
  | 'auto-approved-error'
  | 'auto-approved-failed-classification'
  | 'auto-approved-initial-collect-done'
  | 'ignored'
  | 'failed_initial_collect'
  | 'failed-initial-collect-auto-approved'
  | 'Fetch and validate failed'
  | 'Final category processing failed'
  | 'Final summary processing failed'
  | 'Image processing failed'
  | 'Image selection failed'
  | 'Review summary fetch failed';

export interface ContactInfo {
  phone?: string | null;
  email?: string | null;
  final_email?: string | null;
}

export interface LocationInfo {
  latitude?: number | null;
  longitude?: number | null;
  street?: string | null;
  zip_code?: string | null;
  town?: string | null;
  municipality?: string | null;
  state?: string | null;
  country?: string | null;
  country_code?: string | null;
  full_address?: string | null;
  display_address?: string | null;
  service_area?: string | null;
}

export interface SocialMediaInfo {
  facebook_page?: string | null;
  youtube_channel?: string | null;
  instagram?: string | null;
  linkedin_page?: string | null;
}

export interface UrlInfo {
  supplier_url?: string | null;
  base_url?: string | null;
  activities_url?: string | null;
  conference_url?: string | null;
  accommodation_url?: string | null;
  restaurant_url?: string | null;
  packages_url?: string | null;
  reviews_link?: string | null;
  photos_link?: string | null;
}

export interface MediaInfo {
  logo_url?: string | null;
  image_urls?: string | null; // JSON string of URLs
  google_image_urls?: string | null; // JSON string of URLs
}

export interface BusinessInfo {
  supplier_name: string;
  place_id?: string | null;
  subtitle?: string | null;
  description?: string | null;
  categories?: string | null;
  el_categories?: string | null;
  google_rating?: number | null;
  price?: string | null;
}

export interface ExternalIds {
  tripadvisor_id?: string | null;
  booking_com_id?: string | null;
  data_id?: string | null;
  place_id_search?: string | null;
  el_supplier_id?: number | null;
  cv_supplier_id?: number | null;
}

export interface TransportationDistances {
  distance_to_bus_station?: number | null;
  distance_to_airport?: number | null;
  distance_to_train_station?: number | null;
}

export interface ProcessingInfo {
  ai_prediction?: Record<string, unknown> | null;
  supplier_descriptions?: Record<string, unknown> | null;
  reviews_summaries?: Record<string, unknown> | null;
  sitemap?: Record<string, unknown> | null;
  main_content?: string | null;
  types?: string | null;
  amenities?: string | null;
  service_options?: string | null;
}

export interface AuditInfo {
  created_at?: string | null;
  updated_at?: string | null;
  checked_at?: string | null;
  checked_by?: string | null;
  created_in_el?: string | null;
}

export interface PotentialSupplier {
  id: number;
  initial_id?: number | null;
  status?: string | null;
  contact: ContactInfo;
  location: LocationInfo;
  social_media: SocialMediaInfo;
  urls: UrlInfo;
  media: MediaInfo;
  business: BusinessInfo;
  external_ids: ExternalIds;
  transportation: TransportationDistances;
  processing: ProcessingInfo;
  audit: AuditInfo;
  match_status?: MatchStatus;
  selected_category?: string | null;
  book_on_website?: boolean | null;
  resource_urls?: string | null;
}

export interface SupplierListResponse {
  total: number;
  offset?: number;
  limit?: number;
  suppliers: PotentialSupplier[];
}

export interface Category {
  id: number;
  name: string;
  en_name?: string | null;
  category_group: string;
  parent_category_id?: number | null;
  type: string;
  priority?: number | null;
  deleted?: boolean;
  not_selectable?: boolean;
  name_code?: string | null;
}

export interface ConferenceRoom {
  id?: number;
  website_id?: number;
  supplier_id?: number;
  url?: string | null;
  base_url?: string | null;
  room_name?: string | null;
  description?: string | null;
  capacity_theater?: number | null;
  capacity_classroom?: number | null;
  capacity_banquet?: number | null;
  capacity_boardroom?: number | null;
  capacity_u_shape?: number | null;
  capacity_cocktail?: number | null;
  area_m2?: number | null;
  ceiling_height?: number | null;
  equipment?: string[] | null;
  features?: string[] | null;
  image_urls?: string[] | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Restaurant {
  id?: number;
  website_id?: number;
  supplier_id?: number;
  url?: string | null;
  base_url?: string | null;
  restaurant_name?: string | null;
  description?: string | null;
  cuisine_type?: string | null;
  specialities?: string[] | null;
  seating_capacity?: number | null;
  seating_arrangements?: string | null;
  menu_items?: string[] | null;
  private_rooms?: string | null;
  event_packages?: string | null;
  catering_options?: string | null;
  outdoor_space?: string | null;
  opening_hours?: string | null;
  dietary_options?: string | null;
  average_cost_per_person?: number | null;
  image_urls?: string[] | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Accommodation {
  id?: number;
  website_id?: number;
  supplier_id?: number;
  url?: string | null;
  base_url?: string | null;
  room_type?: string | null;
  description?: string | null;
  room_size?: string | null;
  view?: string | null;
  bed_options?: string | null;
  bathroom_options?: string | null;
  kitchen_options?: string | null;
  wifi_options?: string | null;
  air_conditioning_options?: string | null;
  max_occupancy?: number | null;
  max_rooms?: number | null;
  amenities?: string | null;
  standard_rate?: number | null;
  image_urls?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ActivityResource {
  id?: number;
  website_id?: number;
  supplier_id?: number;
  url: string;
  base_url: string;
  activity_name?: string | null;
  description?: string | null;
  included?: string | null;
  activity_categories?: string | null;
  additional_tags?: string | null;
  min_duration?: string | null;
  max_duration?: string | null;
  min_group_size?: string | null;
  max_group_size?: string | null;
  physically_demanding?: string | null;
  price?: string | null;
  location?: string | null;
  indoor?: boolean | null;
  outdoor?: boolean | null;
  materials_and_equipment?: string | null;
  customization_options?: string | null;
  accessibility?: string | null;
  language_options?: string | null;
  image_urls?: string[] | null;
  pickup_locations?: string | null;
  videos?: string | null;
  additional_costs?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface QueueStatus {
  pending: number;
  in_progress: number;
  completed_today: number;
  failed: number;
  active_workers: number;
  queue_depth: number;
}

export interface PipelineStats {
  stage: string;
  count: number;
  avg_duration_seconds: number;
  success_rate: number;
}

// Admin-specific types for complete supplier view
export interface CompleteSupplierResponse {
  id: number;
  basic_info: {
    name: string;
    subtitle?: string;
    description?: string;
    status: string;
    categories: string[];
    el_categories: string[];
    google_rating?: number;
    logo_url?: string;
  };
  location: {
    full_address?: string;
    coordinates?: { lat: number; lng: number };
    country?: string;
    town?: string;
  };
  contact: {
    phone?: string;
    email?: string;
    final_email?: string;
    website?: string;
  };
  social_media: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  websites: Array<{
    url: string;
    content?: string;
    summary?: string;
    last_crawled?: string;
  }>;
  images: ImageData[];
  resources: {
    conference_rooms_count: number;
    restaurants_count: number;
    accommodations_count: number;
    activities_count: number;
  };
  queue?: {
    position?: number;
    priority?: number;
    current_stage?: string;
    worker?: string;
  };
  processing_timeline: Array<{
    stage: string;
    status: string;
    started_at?: string;
    completed_at?: string;
    duration_seconds?: number;
  }>;
  suggestions: AISuggestion[];
  external_ids: {
    el_supplier_id?: number;
    cv_supplier_id?: number;
  };
  metadata: {
    created_at: string;
    updated_at: string;
    checked_at?: string;
    checked_by?: string;
  };
}

export interface ImageData {
  id: number;
  url: string;
  classification?: string; // Legacy field or primary classification
  classification_data?: {
    score?: number; // Quality/relevance score (1-10)
    labels?: string[]; // Array of classification tags
    reasoning?: string; // AI explanation
    description?: string; // AI-generated description
  };
  quality_score?: number; // Legacy 0-1 scale, use classification_data.score instead
  is_selected: boolean;
  is_duplicate: boolean;
  duplicate_group_id?: number;
  width?: number;
  height?: number;
  file_size?: number;
  image_type?: string; // Column value, may differ from classification_data
}

export interface AISuggestion {
  type: 'missing_data' | 'image_selection' | 'resource_extraction' | 'categorization';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface MapSupplierData {
  id: number;
  name: string;
  coordinates: { lat: number; lng: number };
  status: string;
  status_color: string; // hex color
  primary_category?: string;
  google_rating?: number;
  image_count: number;
  has_resources: boolean;
}

export interface ProcessSupplierRequest {
  stages?: string[];
  priority?: number;
  force?: boolean;
}

export interface ProcessSupplierResponse {
  success: boolean;
  message: string;
  queue_id?: number;
  priority?: number;
  stages?: string[];
}

export interface AIImageSelectRequest {
  min_quality_score?: number;
  max_images?: number;
  remove_duplicates?: boolean;
}

export interface AIImageSelectResponse {
  success: boolean;
  message: string;
  selected_count: number;
  total_count: number;
  selected_ids: number[];
}
