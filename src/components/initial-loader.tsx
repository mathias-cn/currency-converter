export function InitialLoader() {
    return (
        <div className="z-10 absolute inset-0 rounded-lg w-full h-full bg-[rgba(0,0,0,.4)] flex items-center justify-center">
            <img className="size-8 text-green-400 animate-spin" src="loading.svg" alt="Loading Icon" />
        </div>
    )
}