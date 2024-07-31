import { ComponentProps } from "react";

interface SelectProps extends ComponentProps<"select"> {
    options: string[]
    disabledOption: string
}

export function Select({ options, disabledOption, ...props }: SelectProps) {
    return (
        <select {...props}>
            {options.map((o, i) =>
                o === disabledOption ? (
                    <option key={i} value={o} disabled>
                    {o}
                    </option>
                ) : (
                    <option key={i} value={o}>
                    {o}
                    </option>
                )
            )}
        </select>
    )
}