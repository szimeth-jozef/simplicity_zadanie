import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import Select, { type MultiValue } from 'react-select'

export const Route = createFileRoute('/announcements/$id')({
  component: AnnouncementDetail,
})

function AnnouncementDetail() {
  const { id } = Route.useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState<AnnouncementForm>(() =>
    getMockAnnouncement(id),
  )

  const handlePublish = () => {
    if (!form.title.trim()) {
      window.alert('Please enter a title.')
      return
    }

    if (!form.content.trim()) {
      window.alert('Please enter content.')
      return
    }

    if (form.categories.length === 0) {
      window.alert('Please select at least one category.')
      return
    }

    if (!form.publicationDate.trim()) {
      window.alert('Please enter a publication date.')
      return
    }

    const dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4} ([01]\d|2[0-3]):([0-5]\d)$/
    if (!dateFormat.test(form.publicationDate)) {
      window.alert('Please use the publication date format MM/DD/YYYY HH:mm.')
      return
    }

    navigate({ to: '/announcements' })
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10 sm:px-8 sm:py-12">
      <h1 className="mb-7 text-xl font-bold text-gray-900">
        Edit the announcement
      </h1>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-gray-700">Title</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) =>
              setForm((current) => ({ ...current, title: event.target.value }))
            }
            className="block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-gray-700">Content</span>
          <textarea
            value={form.content}
            onChange={(event) =>
              setForm((current) => ({ ...current, content: event.target.value }))
            }
            rows={8}
            className="block w-full resize-y rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
        </label>

        <div>
          <label htmlFor="announcement-categories" className="block text-sm font-semibold text-gray-900">
            Category
          </label>
          <p className="mt-1 text-xs text-gray-600">
            Select category so readers know what your announcement is about.
          </p>
          <Select<CategoryOption, true>
            inputId="announcement-categories"
            isMulti
            options={categoryOptions}
            value={form.categories}
            onChange={(categories: MultiValue<CategoryOption>) =>
              setForm((current) => ({ ...current, categories: [...categories] }))
            }
            className="mt-2 text-sm"
            styles={{
              control: (base, state) => ({
                ...base,
                minHeight: '38px',
                borderColor: state.isFocused ? '#f59e0b' : '#d1d5db',
                boxShadow: state.isFocused ? '0 0 0 2px #fef3c7' : 'none',
                '&:hover': { borderColor: '#f59e0b' },
              }),
            }}
          />
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-900">Publication date</span>
          <input
            type="text"
            value={form.publicationDate}
            onChange={(event) =>
              setForm((current) => ({ ...current, publicationDate: event.target.value }))
            }
            placeholder="MM/DD/YYYY HH:mm"
            className="block w-full rounded-sm border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
          />
        </label>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handlePublish}
          className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Publish
        </button>
      </div>
    </main>
  )
}

type CategoryOption = {
  value: string
  label: string
}

type AnnouncementForm = {
  title: string
  content: string
  categories: CategoryOption[]
  publicationDate: string
}

const categoryOptions: CategoryOption[] = [
  { value: 'City', label: 'City' },
  { value: 'Community events', label: 'Community events' },
  { value: 'Health', label: 'Health' },
]

const mockAnnouncementsById: Record<string, AnnouncementForm> = {
  '1': {
    title: 'Obrazok contest 3',
    content: 'dasda',
    categories: [
      { value: 'City', label: 'City' },
      { value: 'Community events', label: 'Community events' },
    ],
    publicationDate: '08/10/2023 08:55',
  },
}

function getMockAnnouncement(id: string): AnnouncementForm {
  return mockAnnouncementsById[id] ?? {
    title: 'Obrazok contest 3',
    content: 'dasda',
    categories: [{ value: 'City', label: 'City' }],
    publicationDate: '08/10/2023 08:55',
  }
}
