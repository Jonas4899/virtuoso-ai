export function Sidebar({children}) {
    return (
        <div className="flex flex-row md:flex-col items-center justify-center md:justify-between gap-12 md:gap-6 py-4 md:py-14 px-0 md:px-6 border-border border-r-0 md:border-r-2 border-b-2 md:border-b-0">
            {children}
        </div>
    )
}
