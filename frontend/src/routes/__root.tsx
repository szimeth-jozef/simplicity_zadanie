import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen font-sans text-gray-900 bg-white">
      <aside className="w-64 bg-[#FAFAFA] border-r border-gray-100 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-white border border-gray-200 rounded-md shadow-sm flex items-center justify-center text-xs">
            🏛️
          </div>
          <span className="font-semibold text-sm">Test city</span>
        </div>

        <nav className="px-4 mt-2">
          <Link
            to="/announcements"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-yellow-50 [&.active]:bg-[#FFF9E6] [&.active]:text-black text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 11 18-5v12L3 14v-3z"></path>
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
            </svg>
            Announcements
          </Link>
        </nav>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  ),
})