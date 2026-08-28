export interface Announcement {
  id: string
  title: string
  content: string
  publicationDate: string
  lastUpdate: string
  categories: string[]
}

let mockAnnouncements: Announcement[] = [
  { id: '1', title: 'Title 1', content: 'Lorem ipsum 1', publicationDate: '2023-08-11T04:36:00', lastUpdate: '2023-08-11T09:00:00', categories: ['City'] },
  { id: '2', title: 'Title 2', content: 'Lorem ipsum 2', publicationDate: '2023-08-11T04:36:00', lastUpdate: '2023-08-11T08:30:00', categories: ['City'] },
  { id: '3', title: 'Title 3', content: 'Lorem ipsum 3', publicationDate: '2023-08-11T04:35:00', lastUpdate: '2023-08-11T07:15:00', categories: ['City'] },
  { id: '4', title: 'Title 4', content: 'Lorem ipsum 4', publicationDate: '2023-04-19T05:14:00', lastUpdate: '2023-04-19T10:00:00', categories: ['City'] },
  { id: '5', title: 'Title 5', content: 'Lorem ipsum 5', publicationDate: '2023-04-19T05:11:00', lastUpdate: '2023-04-19T09:45:00', categories: ['City'] },
  { id: '6', title: 'Title 6', content: 'Lorem ipsum 6', publicationDate: '2023-04-19T05:11:00', lastUpdate: '2023-04-19T09:30:00', categories: ['City'] },
  { id: '7', title: 'Title 7', content: 'Lorem ipsum 7', publicationDate: '2023-03-24T07:27:00', lastUpdate: '2023-03-24T14:00:00', categories: ['City', 'Health'] },
  { id: '8', title: 'Title 8', content: 'Lorem ipsum 8', publicationDate: '2023-03-24T07:26:00', lastUpdate: '2023-03-24T13:00:00', categories: ['City', 'Health'] },
  { id: '9', title: 'Title 9', content: 'Lorem ipsum 9', publicationDate: '2023-03-24T07:26:00', lastUpdate: '2023-03-24T12:00:00', categories: ['City', 'Health'] },
  { id: '10', title: 'Title 10', content: 'Lorem ipsum 10', publicationDate: '2023-03-24T07:26:00', lastUpdate: '2023-03-24T11:00:00', categories: ['City', 'Health'] },
]

export const api = {
  getAnnouncements: async (): Promise<Announcement[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200)) // simulate network delay
    return [...mockAnnouncements]
  },

  getAnnouncement: async (id: string): Promise<Announcement> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const item = mockAnnouncements.find((a) => a.id === id)
    if (!item) throw new Error('Announcement not found')
    return { ...item }
  },

  updateAnnouncement: async (id: string, data: Partial<Announcement>): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    mockAnnouncements = mockAnnouncements.map((a) =>
      a.id === id ? { ...a, ...data, lastUpdate: new Date().toISOString() } : a
    )
  },
}