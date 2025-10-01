// Core types for the Aptos Certification Platform

export interface Certification {
  id: string
  course_name: string
  student_address: string
  issuer_address: string
  issue_timestamp: number
  certification_id: number
  metadata_uri: string
  skills: string[]
  grade: string
  issuer_name?: string
  student_name?: string
  verification_url?: string
  image?: string
}

export interface CertificationProgram {
  id: number
  title: string
  description: string
  issuer: string
  issuerLogo: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  participants: number
  price: string
  category: string
  skills: string[]
  status: 'Active' | 'Inactive' | 'Draft'
  rating: number
  image: string
  requirements?: string[]
  syllabus?: CourseModule[]
}

export interface CourseModule {
  id: number
  title: string
  description: string
  duration: string
  completed?: boolean
}

export interface CertificationIssuer {
  id: number
  name: string
  address: string
  logo: string
  verified: boolean
  certificatesIssued: number
  rating: number
  specialties: string[]
  reputation_score: number
  authorized: boolean
  description?: string
  website?: string
  social_links?: SocialLinks
}

export interface SocialLinks {
  twitter?: string
  linkedin?: string
  github?: string
  website?: string
}

export interface StudentProfile {
  address: string
  name?: string
  email?: string
  bio?: string
  avatar?: string
  joinDate: string
  completedCourses: number
  earnedCertificates: number
  totalSkills: number
  reputation: number
  level: string
  skill_points: number
  certifications: Certification[]
  achievements?: Achievement[]
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedDate: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
}

export interface PlatformStats {
  totalCertificates: number
  activeCourses: number
  registeredUsers: number
  verifiedIssuers: number
  totalVolume: string
  monthlyGrowth: number
  total_certifications_issued: number
  total_issuers: number
  total_students: number
  platform_reputation: number
}

export interface WalletInfo {
  address: string
  connected: boolean
  connecting: boolean
  network: string
  balance?: string
}

export interface ContractConfig {
  moduleAddress: string
  moduleName: string
  network: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Form types
export interface CreateCertificationForm {
  studentAddress: string
  courseName: string
  skills: string[]
  grade: string
  metadataUri?: string
  description?: string
}

export interface CreateProgramForm {
  title: string
  description: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  price: string
  skills: string[]
  requirements: string[]
  image?: File
}

// UI State types
export interface UIState {
  loading: boolean
  error: string | null
  success: string | null
}

export interface ModalState {
  isOpen: boolean
  type: 'certification' | 'program' | 'profile' | 'wallet' | null
  data?: any
}

export interface FilterState {
  category: string
  difficulty: string
  price: string
  rating: number
  search: string
  sortBy: 'newest' | 'oldest' | 'rating' | 'participants'
}

// Event types for blockchain events
export interface CertificationIssuedEvent {
  certification_id: number
  course_name: string
  student_address: string
  issuer_address: string
  timestamp: number
}

export interface IssuerInitializedEvent {
  issuer_address: string
  name: string
  timestamp: number
}

export interface StudentProfileCreatedEvent {
  student_address: string
  timestamp: number
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type Theme = 'light' | 'dark'

export type UserRole = 'student' | 'issuer' | 'admin'

export interface User {
  address: string
  role: UserRole
  profile?: StudentProfile | CertificationIssuer
  preferences?: UserPreferences
}

export interface UserPreferences {
  theme: Theme
  notifications: boolean
  language: string
  currency: string
}

// Blockchain transaction types
export interface TransactionResult {
  hash: string
  success: boolean
  error?: string
  timestamp: number
}

export interface GasEstimate {
  gasUsed: number
  gasPrice: number
  totalCost: string
}

// Search and Filter types
export interface SearchFilters {
  query?: string
  category?: string
  difficulty?: string
  priceRange?: [number, number]
  rating?: number
  verified?: boolean
  issuer?: string
}

export interface SortOptions {
  field: 'title' | 'rating' | 'participants' | 'created_at' | 'price'
  direction: 'asc' | 'desc'
}

// Component Props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  image?: string
  actions?: React.ReactNode
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel' | 'search'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
  timestamp: number
}

export interface ValidationError {
  field: string
  message: string
}

export interface NetworkError {
  type: 'connection' | 'timeout' | 'server' | 'blockchain'
  message: string
  retryable: boolean
}
