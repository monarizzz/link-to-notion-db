---
name: pr
description: 現在のブランチから main 宛ての PR を、AGENTS.md の PR ルールとテンプレートに沿って作成する
disable-model-invocation: true
---

# /pr

ルールは [AGENTS.md の「PR」節](../../../AGENTS.md#pr) に従う。ここには手順だけを書く。

## 手順

1. AGENTS.md の「PR」節と `.github/PULL_REQUEST_TEMPLATE.md` を読む
2. 差分とコミット履歴を確認する
   - `git fetch` のうえ `git log --oneline origin/main..HEAD` と `git diff origin/main...HEAD`
   - 未 push のコミットがあれば `git push -u origin HEAD`
3. 関連 Issue を特定する
   - ブランチ名・コミット本文・会話から探し、`gh issue view <番号>` で内容を確認する
4. テンプレートの全節を埋めた本文を作る
   - 見出しはすべて残し、HTML コメントは消す
   - 差分・コミット・Issue から判断できない節（レビュー観点・動作確認など）は推測で埋めず、作成前にユーザーに確認する
5. `gh pr create --base main --title "<件名>" --body-file <本文ファイル>` で作成する
   - 件名は AGENTS.md の「メッセージ」と同じ `<種別> <内容>` の形式
6. 関連 Issue にラベルが無い場合だけ、種別に合うラベルを `gh issue edit <番号> --add-label <ラベル>` で付ける
7. 作成した PR の URL を返す
