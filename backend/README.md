# Zadanie Backend

## Development
### Migration
1. Edit /src/db/schema.ts
2. Run `pnpm run db:generate`
3. Run `pnpm run db:migrate`

### Enpoint manual testing
Create endpoint
```
curl -X POST http://localhost:3001/api/announcements \
  -H "Content-Type: application/json" \
  -d '{"title":"Team meeting","content":"Meeting at 10:00 tomorrow.","categories":"work, meetings"}'
```

Get list endpoint
```
curl "http://localhost:3001/api/announcements?search=meeting&categories=work,events"
```

Update endpoint
```
curl -X PUT http://localhost:3001/api/announcements/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated meeting","content":"The meeting is now at 11:00.","categories":"work, meetings"}'
```