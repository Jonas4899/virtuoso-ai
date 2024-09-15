export function Sidebar({ children, className }) {
  return (
    <div className={`flex-shrink-0 border-r border-border ${className}`}>
      <div className="flex flex-col h-full justify-between gap-6 py-4 px-6">
        {children}
      </div>
    </div>
  )
}
