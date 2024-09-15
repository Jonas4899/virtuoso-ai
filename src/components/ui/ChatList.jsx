export function ChatList({ children }) {
  return (
    <div className="w-full flex flex-col gap-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
      {children}
    </div>
  );
}
