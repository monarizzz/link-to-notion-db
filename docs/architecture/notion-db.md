# Notion DB

作業記録を保存している Notion DB の構造と、アプリ側の型との対応。
Notion DB は別の DB へ移行する予定。移行時はこのファイルの「Notion に依存している箇所」を置き換える。

## プロパティ

1 ページ = 1 件の作業記録。

| プロパティ名 | Notion の型 | 意味 | アプリ側（`ToRecord`） | フォーム（`DataForm`） |
| --- | --- | --- | --- | --- |
| `title` | title | 作業のタイトル | `title` | `title` |
| `workTime` | date（範囲） | 作業の開始・終了日時 | `start` / `end` | `start` / `end` |
| `select` | select | 分類ラベルと色 | `color` | `label`（選択肢の名前） |

ページ自体の値も使う。

| 値 | 用途 | アプリ側（`ToRecord`） |
| --- | --- | --- |
| ページ ID | 削除の対象を指定する | `id` |
| ページ URL | Notion で開くボタンのリンク先 | `url` |
| `created_time` | 一覧の並び順（新しい順） | なし |

- ラベルの選択肢は、DB のスキーマ（`select` プロパティの options）から取得する
- 色は Notion の色名（`blue` など）で返る。表示色は `libs/notion/constants/colorMap.ts` で変換する

## 操作

| 操作 | repository | 備考 |
| --- | --- | --- |
| 一覧取得 | `getDBRecords` | `workTime` で絞り込み、`created_time` の降順 |
| スキーマ取得 | `getDBSchema` | ラベルの選択肢を取るために使う |
| 作成 | `postPage` | |
| 削除 | `patchPage` | ページを削除せず、`archived: true` にする |
| DB 情報取得 | `getDBInfo` | `DATA_SOURCE_ID` を調べるときだけ使う |

## 環境変数

| 名前 | 用途 |
| --- | --- |
| `NOTION_TOKEN` | Notion API の認証 |
| `DATABASE_ID` | ページの作成先（`parent.database_id`） |
| `DATA_SOURCE_ID` | 一覧取得・スキーマ取得の対象 |

## Notion に依存している箇所

| 場所 | 依存している内容 |
| --- | --- |
| `apps/web/src/infra/notion/` | Notion API の呼び出し |
| `apps/web/src/libs/notion/` | Notion クライアント、色名の変換表 |
| `apps/web/src/commons/notion/` | Notion のレスポンスから `ToRecord` への変換、スキーマからのラベル一覧の取り出し |
| `apps/web/src/libs/forms/schema/submitProps.ts` | フォームの値から Notion のプロパティへの変換 |
| `apps/web/src/app/page.tsx`、`apps/web/src/app/Calendar/page.tsx` | Notion のフィルタ記法での絞り込み |
