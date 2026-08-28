import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="p-4 bg-white border-b flex gap-4">
        <Link to="/" className="[&.active]:font-bold">
          Announcements
        </Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  ),
})