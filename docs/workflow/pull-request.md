# PR・Issue の書き方

本文は [.github/PULL_REQUEST_TEMPLATE.md](../../.github/PULL_REQUEST_TEMPLATE.md) の節をすべて埋める。

## 件名

- `<種別>(<対象>) <内容>` の形式で、72 文字以内（例: `fix(server) 許可したGoogleアカウントのみログインできるように制限する`）
  - `<種別>` は [コミットと同じ](git-commit-principles.md#種別)
  - `<対象>` は変更する `apps/` 配下のアプリ（`web` / `server`）。両方なら `web,server`、どちらでもなければ `(<対象>)` ごと省く
- Issue の件名も同じ形式にする

## 本文

- 箇条書きで、1 項目に 1 つの変更。各項目は体言止め（例: `- ログイン失敗時のリトライ処理を追加`）
- フォーマット修正・lockfile などの機械的な変更は 1 項目にまとめる
- 差分に無い変更・影響・確認内容を書かない

## Issue のラベル

- 種別に合うラベルを付ける（[対応表](git-commit-principles.md#種別)）
