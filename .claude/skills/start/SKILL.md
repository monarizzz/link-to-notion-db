---
name: start
description: 最新の main から作業ブランチを切り、リモートで削除済みのローカルブランチを片付ける。作業を始めるとき、Issue に取りかかるときに使う。使い方 /start <種別>/<内容>
---

# /start

ルールは [AGENTS.md](../../../AGENTS.md) の「ブランチ」節に従う。ここには手順だけを書く。

## 手順

1. `git status --short` で未コミットの変更を確認する
   - 変更があれば止めて、どう扱うかユーザーに確認する
2. `git fetch --prune` する
3. `git switch main` して `git pull` する
4. `git branch -vv` で `gone` のブランチを探し、`git branch -d` で削除する
   - `-d` で消せない（マージされていない）ものは消さずに報告する
5. ブランチ名を決める
   - 引数があればそれを使う。無ければ Issue や会話から `<種別>/<内容>` を考え、ユーザーに確認する
   - 種別は [git-commit-principles.md](../../../docs/workflow/git-commit-principles.md#種別) の表から選ぶ
6. `git switch -c <ブランチ名>` で切り、ブランチ名と削除したブランチを返す
