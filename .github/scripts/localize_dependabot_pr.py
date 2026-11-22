"""Dependabot の PR の件名と本文を日本語にする。

使い方: localize_dependabot_pr.py <ブランチ名> <本文のファイル> <コミットメッセージのファイル>
結果を {"title": ..., "body": ...} の JSON で標準出力に書く。
Dependabot の本文・コミットメッセージの形が想定と違うときは、終了コード 1 で止める。
"""

import json
import re
import sys

ECOSYSTEMS = {
    "github_actions": ("ci", "GitHub Actions"),
    "npm_and_yarn": ("chore", "npm"),
}

# グループの更新: Updates `actions/cache` from 4 to 6
GROUP_LINE = re.compile(r"^Updates `(?P<name>[^`]+)` from (?P<prev>\S+) to (?P<new>\S+)$", re.M)
# 単独の更新: Bumps [next](https://...) from 16.4.3 to 16.5.0.
SINGLE_LINE = re.compile(r"^Bumps \[(?P<name>[^\]]+)\]\([^)]*\) from (?P<prev>\S+) to (?P<new>\S+?)\.$", re.M)
# コミットメッセージ末尾の YAML の依存名
YAML_NAME = re.compile(r"^- dependency-name: (?P<name>\S+)$", re.M)

START = "<!-- ja-summary -->"
END = "<!-- /ja-summary -->"


def fail(message: str) -> None:
    print(f"::error::{message}", file=sys.stderr)
    sys.exit(1)


def main() -> None:
    branch, body_path, commit_path = sys.argv[1:4]
    with open(body_path, encoding="utf-8") as f:
        body = f.read()
    with open(commit_path, encoding="utf-8") as f:
        commit = f.read()

    # 前回足した要約を消す。rebase のたびに動くため
    body = re.sub(rf"{re.escape(START)}.*?{re.escape(END)}\n*", "", body, flags=re.S).strip("\n")

    parts = branch.split("/")
    if len(parts) < 3 or parts[0] != "dependabot" or parts[1] not in ECOSYSTEMS:
        fail(f"想定していないブランチ名: {branch}")
    type_, label = ECOSYSTEMS[parts[1]]

    # 同じ依存が複数ディレクトリで更新されると同じ行が繰り返されるため、重複を除く
    deps = []
    for m in [*GROUP_LINE.finditer(body), *SINGLE_LINE.finditer(body)]:
        dep = (m["name"], m["prev"], m["new"])
        if dep not in deps:
            deps.append(dep)

    expected = sorted(set(YAML_NAME.findall(commit)))
    found = sorted({name for name, _, _ in deps})
    if not deps or found != expected:
        fail(f"本文から読み取った依存 {found} が、コミットメッセージの依存 {expected} と一致しない")

    if len(found) == 1 and len(deps) == 1:
        name, prev, new = deps[0]
        title = f"{type_} {name} を {prev} から {new} に更新する"
    else:
        title = f"{type_} {label} の依存 {len(found)} 件を更新する"

    rows = "\n".join(f"| `{name}` | {prev} | {new} |" for name, prev, new in deps)
    summary = (
        f"{START}\n"
        "## 更新内容\n\n"
        "| 依存 | 更新前 | 更新後 |\n"
        "| --- | --- | --- |\n"
        f"{rows}\n\n"
        "以下は Dependabot が作成した本文。\n"
        f"{END}\n\n"
    )
    json.dump({"title": title, "body": summary + body}, sys.stdout, ensure_ascii=False)


if __name__ == "__main__":
    main()
