import { toast, ToastOptions, Zoom } from 'react-toastify'

const defaultOptions: ToastOptions = {
  position: 'top-center',
  closeButton: false,
  hideProgressBar: true,
  autoClose: 2000,
  className: 'hot-toast',
  transition: Zoom,
}

const createHotToast = () => {
  const fn = (message: string) => toast(message, defaultOptions)
  return Object.assign(fn, {
    success: (message: string) => toast.success(message, defaultOptions),
    error: (message: string) => toast.error(message, defaultOptions),
    info: (message: string) => toast.info(message, defaultOptions),
    warning: (message: string) => toast.warning(message, defaultOptions),
  })
}

export const hotToast = createHotToast()
