import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/announcements/')({
  component: AnnouncementsPage,
})

function AnnouncementsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Announcements</h1>
    </div>
  )
}