import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/announcements/$id')({
  component: AnnouncementDetail,
})

function AnnouncementDetail() {
  // This is how you read the dynamic ID from the URL
  const { id } = Route.useParams()

  return (
    <div>
      <h1 className="text-2xl font-bold">Announcement {id}</h1>
      {/* Details will go here */}
    </div>
  )
}