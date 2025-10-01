// Utility Helper Functions

import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns'
import { REGEX_PATTERNS, DATE_FORMATS, UI_CONFIG } from './constants'
import type { AppError, ValidationError } from '@types/index'

// Address Utilities
export const truncateAddress = (address: string, startChars = 6, endChars = 4): string => {
  if (!address) return ''
  if (address.length <= startChars + endChars) return address
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}

export const isValidAptosAddress = (address: string): boolean => {
  return REGEX_PATTERNS.WALLET_ADDRESS.test(address)
}

export const formatAddress = (address: string): string => {
  if (!address) return ''
  return address.toLowerCase().startsWith('0x') ? address : `0x${address}`
}

// Number Utilities
export const formatNumber = (num: number, decimals = 2): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(decimals)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(decimals)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(decimals)}K`
  return num.toLocaleString()
}

export const formatCurrency = (amount: number, currency = 'APT'): string => {
  return `${formatNumber(amount)} ${currency}`
}

export const parseAptAmount = (amountStr: string): number => {
  const amount = parseFloat(amountStr)
  return amount * 1e8 // Convert to Octas (smallest unit)
}

export const formatAptAmount = (octas: number): string => {
  return (octas / 1e8).toFixed(4)
}

// Date Utilities
export const formatDate = (
  date: string | number | Date,
  formatType: keyof typeof DATE_FORMATS = 'SHORT'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    if (!isValid(dateObj)) return 'Invalid date'
    return format(dateObj, DATE_FORMATS[formatType])
  } catch {
    return 'Invalid date'
  }
}

export const formatTimeAgo = (date: string | number | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date)
    if (!isValid(dateObj)) return 'Invalid date'
    return formatDistanceToNow(dateObj, { addSuffix: true })
  } catch {
    return 'Invalid date'
  }
}

export const timestampToDate = (timestamp: number): Date => {
  // Handle both seconds and milliseconds timestamps
  const ts = timestamp < 1e12 ? timestamp * 1000 : timestamp
  return new Date(ts)
}

// String Utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Validation Utilities
export const validateEmail = (email: string): ValidationError | null => {
  if (!email) return { field: 'email', message: 'Email is required' }
  if (!REGEX_PATTERNS.EMAIL.test(email)) {
    return { field: 'email', message: 'Please enter a valid email address' }
  }
  return null
}

export const validateRequired = (value: string, fieldName: string): ValidationError | null => {
  if (!value || value.trim() === '') {
    return { field: fieldName, message: `${capitalize(fieldName)} is required` }
  }
  return null
}

export const validateUrl = (url: string): ValidationError | null => {
  if (!url) return null // URL is optional
  if (!REGEX_PATTERNS.URL.test(url)) {
    return { field: 'url', message: 'Please enter a valid URL' }
  }
  return null
}

export const validateWalletAddress = (address: string): ValidationError | null => {
  if (!address) return { field: 'address', message: 'Wallet address is required' }
  if (!isValidAptosAddress(address)) {
    return { field: 'address', message: 'Please enter a valid Aptos wallet address' }
  }
  return null
}

// File Utilities
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const isValidImageFile = (file: File): boolean => {
  return UI_CONFIG.SUPPORTED_IMAGE_TYPES.includes(file.type) && 
         file.size <= UI_CONFIG.MAX_FILE_SIZE
}

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

// Array Utilities
export const removeDuplicates = <T>(array: T[], key?: keyof T): T[] => {
  if (!key) return [...new Set(array)]

  const seen = new Set()
  return array.filter(item => {
    const value = item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

export const sortByKey = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

// Debounce Utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number = UI_CONFIG.DEBOUNCE_DELAY
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Throttle Utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

// Local Storage Utilities
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Failed to remove from localStorage:', error)
    }
  },

  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }
}

// Error Utilities
export const createAppError = (
  code: string,
  message: string,
  details?: any
): AppError => ({
  code,
  message,
  details,
  timestamp: Date.now(),
})

export const isAppError = (error: any): error is AppError => {
  return error && typeof error === 'object' && 'code' in error && 'message' in error
}

export const getErrorMessage = (error: unknown): string => {
  if (isAppError(error)) return error.message
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unexpected error occurred'
}

// Color Utilities
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const getRandomColor = (): string => {
  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4']
  return colors[Math.floor(Math.random() * colors.length)]
}

// Rating Utilities
export const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}

export const getRatingStars = (rating: number): { filled: number; partial: number; empty: number } => {
  const filled = Math.floor(rating)
  const partial = rating % 1 >= 0.5 ? 1 : 0
  const empty = 5 - filled - partial
  return { filled, partial, empty }
}

// Search Utilities
export const highlightText = (text: string, query: string): string => {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

export const fuzzySearch = (items: any[], query: string, keys: string[]): any[] => {
  if (!query) return items

  const lowercaseQuery = query.toLowerCase()
  return items.filter(item =>
    keys.some(key => {
      const value = item[key]
      return value && value.toString().toLowerCase().includes(lowercaseQuery)
    })
  )
}

// Copy to Clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textArea)
    return success
  }
}

// Download Utilities
export const downloadJson = (data: any, filename: string): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Performance Utilities
export const measurePerformance = (name: string, fn: () => void): void => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}

// Export all utilities
export default {
  truncateAddress,
  isValidAptosAddress,
  formatAddress,
  formatNumber,
  formatCurrency,
  parseAptAmount,
  formatAptAmount,
  formatDate,
  formatTimeAgo,
  timestampToDate,
  capitalize,
  slugify,
  truncateText,
  generateId,
  validateEmail,
  validateRequired,
  validateUrl,
  validateWalletAddress,
  formatFileSize,
  isValidImageFile,
  getFileExtension,
  removeDuplicates,
  sortByKey,
  groupBy,
  debounce,
  throttle,
  storage,
  createAppError,
  isAppError,
  getErrorMessage,
  hexToRgba,
  getRandomColor,
  formatRating,
  getRatingStars,
  highlightText,
  fuzzySearch,
  copyToClipboard,
  downloadJson,
  measurePerformance,
}
