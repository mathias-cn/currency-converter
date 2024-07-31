import { Icons } from "./icons";

export function Links() {
    return (
        <div className="flex gap-2 items-center">
            <a href="https://github.com/mathias-cn" target="_blank">
                <Icons icon="github" />
            </a>
            <a href="https://www.linkedin.com/in/mathiascn/" target="_blank">
                <Icons icon="linkedin" />
            </a>
        </div>
    )
}