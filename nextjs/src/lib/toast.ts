import { ExternalToast, toast } from "sonner";

type ToastMessage = {
  title: string
} & ExternalToast

export async function toastPromise<T>(promise: Promise<T>, options: {
  loading: string | ToastMessage,
  success: string | ToastMessage | ((d: T) => string | ToastMessage)
  error: string | ToastMessage | ((e: any) => string | ToastMessage)
}) {
  let id: any
  if (typeof options.loading === 'string') {
    id = toast.loading(options.loading)
  } else {
    id = toast.loading(options.loading.title)
  }
  try {
    const data = await promise
    const success = typeof options.success === 'function' ? options.success(data) : options.success
    if (typeof success === 'string') {
      toast.success(success, { id })
    } else {
      const { title, ...rest } = success
      toast.success(title, { id, ...rest })
    }
  } catch (e) {
    const error = typeof options.error === 'function' ? options.error(e) : options.error
    if (typeof error === 'string') {
      toast.error(error, { id })
    } else {
      const { title, ...rest } = error
      toast.error(title, { id, ...rest })
    }
  }
}