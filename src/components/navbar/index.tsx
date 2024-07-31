import { Links } from "./components/links";
import { Logo } from "./components/logo";

export function Navbar() {
    return (
        <nav className="absolute flex items-center justify-between top-2 sm:top-4 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] bg-slate-50 p-3 rounded-lg shadow-md">
            <Logo />
            <Links />
        </nav>
    )
}