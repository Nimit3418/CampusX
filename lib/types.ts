// CampusXchange TypeScript Types

export interface Profile {
  id: string
  email: string
  full_name: string
  college_id?: string
  phone?: string
  avatar_url?: string
  bio?: string
  hostel_block?: string
  rating: number
  total_reviews: number
  is_verified_student: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  seller_id: string
  title: string
  description: string
  price: number
  category: string
  condition: "new" | "like_new" | "good" | "fair"
  location?: string
  images: string[]
  status: "available" | "reserved" | "sold"
  reserved_by?: string
  reserved_at?: string
  views: number
  created_at: string
  updated_at: string
  seller?: Profile
}

export interface Service {
  id: string
  provider_id: string
  title: string
  description: string
  category: string
  price_type: "fixed" | "hourly" | "negotiable"
  price: number
  delivery_time?: string
  images: string[]
  is_available: boolean
  rating: number
  total_bookings: number
  views: number
  created_at: string
  updated_at: string
  provider?: Profile
}

export interface Request {
  id: string
  requester_id: string
  title: string
  description: string
  category: string
  urgency: "low" | "medium" | "high" | "urgent"
  budget_min?: number
  budget_max?: number
  location?: string
  status: "open" | "in_progress" | "fulfilled" | "closed"
  fulfilled_by?: string
  expires_at?: string
  views: number
  created_at: string
  updated_at: string
  requester?: Profile
}

export interface RequestResponse {
  id: string
  request_id: string
  responder_id: string
  message: string
  proposed_price?: number
  status: "pending" | "accepted" | "declined"
  created_at: string
  responder?: Profile
}

export interface Booking {
  id: string
  service_id: string
  buyer_id: string
  provider_id: string
  message?: string
  scheduled_at?: string
  status: "pending" | "accepted" | "declined" | "in_progress" | "completed" | "cancelled"
  total_price: number
  payment_method?: "upi" | "cash"
  payment_status: "pending" | "completed"
  created_at: string
  updated_at: string
  service?: Service
  buyer?: Profile
  provider?: Profile
}

export interface Order {
  id: string
  product_id: string
  buyer_id: string
  seller_id: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  total_price: number
  payment_method?: "upi" | "cash"
  payment_status: "pending" | "completed"
  meetup_location?: string
  meetup_time?: string
  created_at: string
  updated_at: string
  product?: Product
  buyer?: Profile
  seller?: Profile
}

export interface Review {
  id: string
  reviewer_id: string
  target_id: string
  target_type: "product" | "service" | "user"
  rating: number
  comment?: string
  created_at: string
  reviewer?: Profile
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  booking_id?: string
  order_id?: string
  content: string
  is_read: boolean
  created_at: string
  sender?: Profile
  receiver?: Profile
}

// Category constants
export const PRODUCT_CATEGORIES = [
  "Textbooks",
  "Electronics",
  "Stationery",
  "Lab Equipment",
  "Sports",
  "Furniture",
  "Clothing",
  "Other",
] as const

export const SERVICE_CATEGORIES = [
  "Academic Help",
  "Design & Creative",
  "Tech & Coding",
  "Writing & Editing",
  "Photography",
  "Video Editing",
  "Music & Audio",
  "Other Skills",
] as const

export const REQUEST_CATEGORIES = [
  "Borrow Item",
  "Academic Help",
  "Tech Support",
  "Creative Work",
  "Errands",
  "Other",
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number]
export type RequestCategory = (typeof REQUEST_CATEGORIES)[number]
