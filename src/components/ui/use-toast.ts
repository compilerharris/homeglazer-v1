import type { ReactNode } from "react"
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
export type ToastActionElement = React.ReactElement
export type ToastProps = {
    id?: string
    title?: ReactNode
    description?: ReactNode
    action?: ToastActionElement
    duration?: number
    variant?: "default" | "success" | "destructive"
  }
