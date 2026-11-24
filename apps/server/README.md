```txt
pnpm install
pnpm dev
```

ローカルの D1 にマイグレーションを当て、開発用の初期データ（`seed.sql`）を入れる:

```txt
pnpm seed
```

```txt
pnpm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
pnpm cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiating `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
