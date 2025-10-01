// Application Constants

// Contract Configuration
export const CONTRACT_CONFIG = {
  MODULE_ADDRESS: import.meta.env.VITE_MODULE_ADDRESS || '0x19004ee0356664f98fe6a8add771a2747a2b38328a70af222faccb3fdfe226ad',
  MODULE_NAME: import.meta.env.VITE_MODULE_NAME || 'MicroCertification',
  NETWORK: import.meta.env.VITE_APTOS_NETWORK || 'devnet',
  NODE_URL: import.meta.env.VITE_APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com/v1',
  FAUCET_URL: import.meta.env.VITE_APTOS_FAUCET_URL || 'https://faucet.devnet.aptoslabs.com',
} as const

// Application Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Aptos CertiFi',
  DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Micro Certification NFT Platform',
  URL: import.meta.env.VITE_APP_URL || 'http://localhost:5173',
  VERSION: '1.0.0',
} as const

// UI Constants
export const UI_CONFIG = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 4000,
  DEBOUNCE_DELAY: 300,
  PAGINATION_LIMIT: 12,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
} as const

// Route Paths
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EXPLORE: '/explore',
  CREATE: '/create',
  MY_CERTIFICATIONS: '/my-certifications',
  PROFILE: '/profile',
  ISSUER: '/issuer',
  VERIFY: '/verify',
  ABOUT: '/about',
  HELP: '/help',
} as const

// Certification Categories
export const CATEGORIES = [
  'Technology',
  'Development',
  'Design',
  'Finance',
  'Marketing',
  'Business',
  'Science',
  'Arts',
  'Languages',
  'Health',
  'Other',
] as const

// Difficulty Levels
export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
] as const

// Skills Database
export const SKILL_CATEGORIES = {
  BLOCKCHAIN: [
    'Blockchain Fundamentals',
    'Smart Contracts',
    'DeFi',
    'NFTs',
    'Cryptography',
    'Consensus Mechanisms',
    'Tokenomics',
    'Web3',
  ],
  DEVELOPMENT: [
    'Move Programming',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Rust',
    'Solidity',
    'API Development',
    'Database Design',
  ],
  DESIGN: [
    'UI/UX Design',
    'Graphic Design',
    'Web Design',
    'Mobile Design',
    'User Research',
    'Prototyping',
    'Design Systems',
    'Figma',
  ],
  BUSINESS: [
    'Project Management',
    'Digital Marketing',
    'Data Analysis',
    'Strategy',
    'Leadership',
    'Communication',
    'Sales',
    'Customer Service',
  ],
} as const

// Grade Options
export const GRADE_OPTIONS = [
  'A+',
  'A',
  'A-',
  'B+',
  'B',
  'B-',
  'C+',
  'C',
  'Pass',
  'Completed',
] as const

// Wallet Networks
export const NETWORKS = {
  MAINNET: 'mainnet',
  TESTNET: 'testnet',
  DEVNET: 'devnet',
  LOCAL: 'local',
} as const

// Transaction Types
export const TRANSACTION_TYPES = {
  INITIALIZE_ISSUER: 'initialize_issuer',
  INITIALIZE_STUDENT: 'initialize_student_profile',
  ISSUE_CERTIFICATION: 'issue_certification',
  UPDATE_REPUTATION: 'update_issuer_reputation',
} as const

// Event Types
export const EVENT_TYPES = {
  CERTIFICATION_ISSUED: 'CertificationIssued',
  ISSUER_INITIALIZED: 'IssuerInitialized',
  STUDENT_PROFILE_CREATED: 'StudentProfileCreated',
} as const

// Error Codes
export const ERROR_CODES = {
  NOT_INITIALIZED: 1,
  ALREADY_INITIALIZED: 2,
  INVALID_STUDENT: 3,
  CERTIFICATION_NOT_FOUND: 4,
  UNAUTHORIZED: 5,
  WALLET_NOT_CONNECTED: 1001,
  INSUFFICIENT_BALANCE: 1002,
  TRANSACTION_FAILED: 1003,
  NETWORK_ERROR: 1004,
  INVALID_INPUT: 1005,
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  CERTIFICATION_ISSUED: 'Certification issued successfully!',
  ISSUER_INITIALIZED: 'Issuer profile created successfully!',
  STUDENT_INITIALIZED: 'Student profile created successfully!',
  WALLET_CONNECTED: 'Wallet connected successfully!',
  TRANSACTION_SUBMITTED: 'Transaction submitted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet to continue',
  INSUFFICIENT_BALANCE: 'Insufficient balance to complete transaction',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_ADDRESS: 'Invalid wallet address',
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  UNSUPPORTED_FILE: 'Unsupported file type',
  CERTIFICATION_NOT_FOUND: 'Certification not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
} as const

// Loading Messages
export const LOADING_MESSAGES = {
  CONNECTING_WALLET: 'Connecting wallet...',
  SUBMITTING_TRANSACTION: 'Submitting transaction...',
  LOADING_CERTIFICATIONS: 'Loading certifications...',
  LOADING_PROFILE: 'Loading profile...',
  UPLOADING_FILE: 'Uploading file...',
  INITIALIZING: 'Initializing...',
} as const

// Social Media Links
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/aptoscertifi',
  DISCORD: 'https://discord.gg/aptoscertifi',
  GITHUB: 'https://github.com/aptoscertifi',
  DOCS: 'https://docs.aptoscertifi.com',
  BLOG: 'https://blog.aptoscertifi.com',
} as const

// API Endpoints (if using external APIs)
export const API_ENDPOINTS = {
  METADATA: '/api/metadata',
  IMAGES: '/api/images',
  ANALYTICS: '/api/analytics',
  NOTIFICATIONS: '/api/notifications',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'aptoscertifi_theme',
  WALLET_PREFERENCE: 'aptoscertifi_wallet',
  USER_PREFERENCES: 'aptoscertifi_user_prefs',
  RECENT_SEARCHES: 'aptoscertifi_recent_searches',
  FAVORITES: 'aptoscertifi_favorites',
} as const

// Regex Patterns
export const REGEX_PATTERNS = {
  WALLET_ADDRESS: /^0x[a-fA-F0-9]{64}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  ALPHANUMERIC: /^[a-zA-Z0-9\s]+$/,
} as const

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const

// Certificate Template Configuration
export const CERTIFICATE_CONFIG = {
  DEFAULT_TEMPLATE: 'modern',
  TEMPLATES: ['modern', 'classic', 'minimal', 'elegant'],
  COLORS: ['blue', 'purple', 'green', 'gold', 'red'],
  FONTS: ['Inter', 'Playfair Display', 'Roboto', 'Open Sans'],
} as const

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_MULTI_LANGUAGE: false,
  ENABLE_ADVANCED_SEARCH: true,
  ENABLE_CERTIFICATE_TEMPLATES: false,
} as const

// Rate Limiting
export const RATE_LIMITS = {
  CERTIFICATION_CREATION: {
    REQUESTS: 10,
    WINDOW: 60 * 1000, // 1 minute
  },
  PROFILE_UPDATES: {
    REQUESTS: 5,
    WINDOW: 60 * 1000, // 1 minute
  },
  SEARCH_REQUESTS: {
    REQUESTS: 100,
    WINDOW: 60 * 1000, // 1 minute
  },
} as const

// Export all constants
export default {
  CONTRACT_CONFIG,
  APP_CONFIG,
  UI_CONFIG,
  ROUTES,
  CATEGORIES,
  DIFFICULTY_LEVELS,
  SKILL_CATEGORIES,
  GRADE_OPTIONS,
  NETWORKS,
  TRANSACTION_TYPES,
  EVENT_TYPES,
  ERROR_CODES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  LOADING_MESSAGES,
  SOCIAL_LINKS,
  API_ENDPOINTS,
  STORAGE_KEYS,
  REGEX_PATTERNS,
  DATE_FORMATS,
  CERTIFICATE_CONFIG,
  FEATURE_FLAGS,
  RATE_LIMITS,
}
