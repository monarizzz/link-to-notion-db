# Web の層構成

`apps/web/src/` の層の責務と依存の向き。

## 層と責務

| 層 | 責務 | 例 |
| --- | --- | --- |
| `app/` | ルーティング。データを取得し、`features` のページコンポーネントへ渡す | `page.tsx`、`api/auth/` |
| `features/` | 1 つのページ・機能でだけ使うコンポーネント | `home/`、`calendarPage/`、`workCard/` |
| `commons/` | 複数のページ・機能で使うコンポーネントと処理（Server Actions を含む） | `button/`、`calendar/`、`modal/` |
| `infra/` | 外部サービスへのアクセス。1 操作 1 ファイルの repository にする | `notion/repositories/` |
| `libs/` | ライブラリのクライアント・設定・定数・スキーマ。アプリの機能を持たない | `notion/`、`forms/`、`shadcn/`、`auth/` |

## 依存の向き

```
app → features → commons → infra → libs
```

- 矢印の向きにだけ import する。下の層から上の層を import しない
- 同じ層の中の import はよい
- `app` はどの層も import してよい

### 既知の例外

- `commons/workCard/components/WorkCard.tsx` が `features/workCard/` を import している（逆向き）。
  新しいコードでは真似しない

## 粒度

各層の下は、ドメイン（`calendar`、`notion` など）ごとのディレクトリに分け、その中を種類で分ける。

```
<層>/<ドメイン>/
├── components/<Component>/
│   ├── <Component>.tsx
│   └── <Component>.stories.tsx
├── utils/      # 関数・Server Actions
├── types/      # 型
└── constants/  # 定数
```

- コンポーネントは 1 つにつき 1 ディレクトリ。Story を同じディレクトリに置く
- ディレクトリ名は camelCase、コンポーネント名は PascalCase
- 既存コードには `type/`（単数形）や、コンポーネントのディレクトリを持たないもの（`commons/sideBar/components/SideBar.tsx`）が残っている。新しく作るときは上の形に合わせる
