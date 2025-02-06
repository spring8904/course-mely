declare global {
  interface Window {
    jQuery: typeof import('jquery')
  }
}

export {}
