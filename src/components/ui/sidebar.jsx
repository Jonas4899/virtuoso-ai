export function Sidebar({ children }) {
  return (
    <div className="flex flex-col items-center justify-between gap-6 px-6 py-14 border-border border-r-2">
      {children}
    </div>
  )
}
