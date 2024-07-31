import { ReactNode } from "react"

interface ModalProps {
    children: ReactNode
}

export function Modal({ children }: ModalProps) {
    return (
        <div className="relative bg-slate-50 p-4 rounded-lg shadow-md space-y-3">
            {children}
        </div>
    )
}