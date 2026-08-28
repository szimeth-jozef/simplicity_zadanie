import { Link, createFileRoute } from '@tanstack/react-router'
import {
  coreFeatures,
  flexRender,
  useTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { api, type Announcement } from '../api/announcements'
import { formatDate } from '../utils/date'

export const Route = createFileRoute('/announcements/')({
  component: AnnouncementsPage,
  loader: () => api.getAnnouncements(),
})

const columns: ColumnDef<typeof coreFeatures, Announcement>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.original.title,
  },
  {
    accessorKey: 'publicationDate',
    header: 'Publication date',
    cell: ({ row }) => formatDate(row.original.publicationDate),
  },
  {
    accessorKey: 'lastUpdate',
    header: 'Last update',
    cell: ({ row }) => formatDate(row.original.lastUpdate),
  },
  {
    accessorKey: 'categories',
    header: 'Categories',
    cell: ({ row }) => row.original.categories.join(', '),
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <Link
        to="/announcements/$id"
        params={{ id: row.original.id }}
        aria-label={`Edit ${row.original.title}`}
        className="inline-flex rounded p-1 text-gray-500 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.688-1.688a2.25 2.25 0 1 1 3.182 3.182L10.582 17.132a4.5 4.5 0 0 1-1.897 1.13l-3.249.975.975-3.249a4.5 4.5 0 0 1 1.13-1.897l9.321-9.604Zm0 0L19.5 7.125"
          />
        </svg>
      </Link>
    ),
  },
]

function AnnouncementsPage() {
  const initialData = Route.useLoaderData()
  const data = useMemo(
    () =>
      [...initialData].sort(
        (a, b) =>
          new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime(),
      ),
    [initialData],
  )

  const table = useTable({
    features: coreFeatures,
    columns,
    data,
  })

  return (
    <div className="p-8 sm:p-10">
      <h1 className="mb-8 text-xl font-semibold text-gray-900">Announcements</h1>

      <div className="overflow-x-auto border-y border-gray-200">
        <table className="w-full min-w-180 text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold text-gray-900 first:pl-0 last:w-12 last:pr-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 transition-colors hover:bg-gray-50"
              >
                {row.getAllCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-gray-700 first:pl-0 last:pr-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
