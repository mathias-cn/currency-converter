interface IconsProps {
    icon: string
}

export function Icons({ icon }: IconsProps) {
    if(icon === "github") return (
        <img className="size-6 text-green-400" src="github-mark.svg" alt="Github Icon" />
    )
    
    return (
        <img className="size-6 text-green-400" src="linkedin.svg" alt="Linkedin Icon" />
    )
}