export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)

  const pad = (n: number) => String(n).padStart(2, '0')

  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const year = date.getFullYear()
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  return `${month}/${day}/${year} ${hours}:${minutes}`
}

export function parseFromForm(formDate: string): string {
  const [dateStr, timeStr] = formDate.split(' ')
  const [month, day, year] = dateStr.split('/')
  return `${year}-${month}-${day}T${timeStr}:00`
}