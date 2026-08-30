# Announcements API

A REST API for creating, searching, updating, retrieving, and deleting announcements. Data is stored in PostgreSQL through Drizzle ORM.

## Requirements

- Node.js and pnpm
- A running PostgreSQL database

## Run the project

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a `.env` file in the project root and configure the database connection:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME
   ```

3. Apply the included database migrations:

   ```bash
   pnpm run db:migrate
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

The API listens on `http://localhost:3001` by default. Set `PORT` in `.env` to use another port.

When changing the database schema, first generate a migration and then apply it:

```bash
pnpm run db:generate
pnpm run db:migrate
```

## API reference

Base URL: `http://localhost:3001/api/announcements`

| Method | Path | Description | Successful response |
| --- | --- | --- | --- |
| `POST` | `/` | Create an announcement | `201 { "id": 1 }` |
| `GET` | `/` | List announcements, with optional search and category filtering | `200` with an array |
| `GET` | `/:id` | Retrieve one announcement | `200` with the announcement |
| `PUT` | `/:id` | Replace an announcement | `200` with the updated announcement |
| `DELETE` | `/:id` | Delete an announcement | `204 No Content` |

`GET /` (outside the API base URL) is a simple health-check endpoint.

### Announcement body

Create and update requests require a JSON body with all three fields:

```json
{
  "title": "Team meeting",
  "content": "Meeting at 10:00 tomorrow.",
  "categories": "work, meetings"
}
```

- `title` and `content` must be non-empty strings.
- `categories` must be a comma-separated string containing one or more non-empty category names.
- Whitespace around fields and category separators is trimmed before storage.

Invalid request data returns `400 Bad Request`. A non-existent announcement ID returns `404 Not Found`.

### List filtering

`GET /api/announcements` supports these optional query parameters:

| Parameter | Example | Behavior |
| --- | --- | --- |
| `search` | `?search=meeting` | Case-insensitive text search in both title and content. |
| `categories` | `?categories=work,events` | Returns announcements with any listed category; matching is case-insensitive. |

Both parameters can be combined:

```text
GET /api/announcements?search=meeting&categories=work,events
```

## Testing with Postman

1. Start the server with `pnpm dev`.
2. In Postman, create an environment variable named `baseUrl` with the value `http://localhost:3001/api/announcements`.
3. Create a `POST {{baseUrl}}` request. Under **Body** select **raw** and **JSON**, then use the announcement body above. Click **Send** and copy the returned `id`.
4. Use that ID in the remaining requests:

   - `GET {{baseUrl}}?search=meeting&categories=work`
   - `GET {{baseUrl}}/1`
   - `PUT {{baseUrl}}/1` with **raw JSON** body containing `title`, `content`, and `categories`
   - `DELETE {{baseUrl}}/1`

For every request with a JSON body, include the header:

```text
Content-Type: application/json
```

## Testing with curl

Create an announcement:

```bash
curl -X POST http://localhost:3001/api/announcements \
  -H "Content-Type: application/json" \
  -d '{"title":"Team meeting","content":"Meeting at 10:00 tomorrow.","categories":"work, meetings"}'
```

List and search announcements:

```bash
curl "http://localhost:3001/api/announcements?search=meeting&categories=work,events"
```

Retrieve an announcement:

```bash
curl http://localhost:3001/api/announcements/1
```

Update an announcement:

```bash
curl -X PUT http://localhost:3001/api/announcements/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated meeting","content":"The meeting is now at 11:00.","categories":"work, meetings"}'
```

Delete an announcement:

```bash
curl -X DELETE http://localhost:3001/api/announcements/1
```
