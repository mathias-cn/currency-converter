import { ReactNode } from "react"

interface InputLabelProps {
    name: string
    label: string
    children: ReactNode
    extraClass?: string
}

export function InputLabel({ name, label, children, extraClass }: InputLabelProps) {
    return (
        <div className={`flex flex-col ${extraClass}`}>
            <label htmlFor={name} className="font-semibold">{label}</label>
            {children}
        </div>
    )
}