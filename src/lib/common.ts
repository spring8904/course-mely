export const setLocalStorage = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('vi-VN').format(value)
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

export const formatDateTime = (
  value: string,
  type: 'date' | 'time' | 'both' = 'both'
): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }

  if (type === 'date') {
    delete options.hour
    delete options.minute
  } else if (type === 'time') {
    delete options.day
    delete options.month
    delete options.year
  }

  return new Intl.DateTimeFormat('vi-VN', options).format(new Date(value))
}

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'percent',
  }).format(value / 100)
}
