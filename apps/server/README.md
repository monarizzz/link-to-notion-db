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

## API

### 日時

- リクエストの日時は ISO 8601 形式で指定する
- タイムゾーンが無い日時（例: `2026-10-26T10:00:00`）は日本時間（`+09:00`）として扱う
- レスポンスの日時は UTC の ISO 8601 形式（例: `2026-10-26T01:00:00.000Z`）で返す

### エラーレスポンス

次の形で返す。`fields` は項目名をキーにしたエラーメッセージの配列。

```json
{
  "error": {
    "code": "INVALID_TIME_RANGE",
    "message": "入力内容に誤りがあります",
    "fields": {
      "ended_at": ["終了日時は開始日時より後にしてください"]
    }
  }
}
```

| `code` | ステータス | 条件 |
| --- | --- | --- |
| `VALIDATION_ERROR` | 400 | 型が違う・必須項目が無い・余分なキーがある・日時の形式が不正 |
| `INVALID_TIME_RANGE` | 422 | 開始日時が終了日時以降 |
| `LABEL_NOT_FOUND` | 422 | 存在しないラベル ID が含まれる |
| `WORK_RECORD_NOT_FOUND` | 404 | 指定した ID の作業記録が無い |

次の 2 つは Hono（`zValidator`）の標準の挙動に任せている。

- `Content-Type` が JSON でない: ボディを読まず空として検証するため、`VALIDATION_ERROR`（400）になる
- JSON として読めない: 上の形ではなく、テキスト `Malformed JSON in request body` を 400 で返す
