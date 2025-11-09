import Sidebar from './Sidebar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="hidden md:block">
        {/* Import your Sidebar component */}
        <Sidebar />
      </div>

      {/* Page Content */}
      <main className="ml-64 w-full p-6">{children}</main>
    </div>
  )
}
