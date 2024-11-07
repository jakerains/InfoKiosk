import * as React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type ToasterState = {
  toasts: ToasterToast[]
}

let listeners: ((state: ToasterState) => void)[] = []

let memoryState: ToasterState = { toasts: [] }

function dispatch(action: any) {
  memoryState = { ...memoryState, toasts: action.toasts || [] }
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function addToast(toast: ToasterToast) {
  const { toasts } = memoryState

  dispatch({
    toasts: [toast, ...toasts].slice(0, TOAST_LIMIT),
  })

  setTimeout(() => {
    dispatch({
      toasts: memoryState.toasts.filter((t) => t.id !== toast.id),
    })
  }, TOAST_REMOVE_DELAY)
}

export function useToast() {
  const [state, setState] = React.useState<ToasterState>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      listeners = listeners.filter((listener) => listener !== setState)
    }
  }, [state])

  return {
    toasts: state.toasts,
    toast: (props: Omit<ToasterToast, "id">) => {
      const id = Math.random().toString(36).substr(2, 9)
      addToast({ id, ...props })
    },
    dismiss: (toastId: string) => {
      dispatch({
        toasts: memoryState.toasts.filter((t) => t.id !== toastId),
      })
    },
  }
}
