# Zadanie Backend

## Development
### Migration
1. Edit /src/db/schema.ts
2. Run `pnpm run db:generate`
3. Run `pnpm run db:migrate`

### Enpoint manual testing
```
curl -X POST http://localhost:3001/api/announcements \
  -H "Content-Type: application/json" \
  -d '{"title":"Team meeting","content":"Meeting at 10:00 tomorrow.","categories":"work, meetings"}'
```

```
curl "http://localhost:3001/api/announcements?search=meeting&categories=work,events"
```