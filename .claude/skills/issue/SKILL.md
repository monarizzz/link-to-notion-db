---
name: issue
description: docs/workflow/pull-request.md と .github/ISSUE_TEMPLATE/ に沿って Issue を作成・更新する。「Issue 切って」「Issue にして」と頼まれたときや、「決めること」が決まって Issue を書き直すときに使う
---

# /issue

ルールは [docs/workflow/pull-request.md](../../../docs/workflow/pull-request.md) に従う。ここには手順だけを書く。

## 作成するとき

1. docs/workflow/pull-request.md と、使うテンプレートを `.github/ISSUE_TEMPLATE/` から読む
   - 機能の追加・変更 → `enhancement_template.md`
   - 不具合 → `bug_template.md`
   - それ以外（refactor / docs / ci / chore） → `task_template.md`
2. 分割するか決める
   - 1 Issue = 1 PR で閉じられる単位にする
   - 分割の仕方はユーザーに確認する
3. テンプレートの全節を埋めた本文を作る
   - 見出しはすべて残し、HTML コメントは消す
   - 「決めること」には判断が要る点だけを書き、決定内容は書かない。無ければ「なし」
   - 会話や既存の Issue から判断できない節は推測で埋めず、作成前にユーザーに確認する
   - 依存・後続の Issue があれば「関連情報」に `Refs #<番号>` で書く
4. `gh issue create --title "<件名>" --label <ラベル> --body-file <本文ファイル>` で作成する
   - 件名の形式は docs/workflow/pull-request.md に従う
   - ラベルは種別に合うもの（[対応表](../../../docs/workflow/git-commit-principles.md#種別)）
5. 作成した Issue の URL を返す

## 「決めること」が決まったとき

1. `gh issue view <番号>` で今の本文を確認する
2. 決まった項目にチェックを付け、決定内容を「詳細」の直下に文章で書く
3. それ以外の節はそのまま残し、`gh issue edit <番号> --body-file <本文ファイル>` で更新して URL を返す
