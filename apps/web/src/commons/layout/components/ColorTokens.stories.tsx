import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = {
  title: "Design/ColorTokens",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type TokenGroup = {
  label: string;
  tokens: { name: string; cssVar: string; description?: string }[];
};

const groups: TokenGroup[] = [
  {
    label: "Base",
    tokens: [
      { name: "background", cssVar: "--background", description: "ページ背景" },
      {
        name: "foreground",
        cssVar: "--foreground",
        description: "メインテキスト",
      },
      {
        name: "foreground-dark",
        cssVar: "--foreground-dark",
        description: "暗い背景上のテキスト",
      },
    ],
  },
  {
    label: "Primary",
    tokens: [
      {
        name: "primary",
        cssVar: "--primary",
        description: "ラベル・サブテキスト",
      },
      {
        name: "primary-foreground",
        cssVar: "--primary-foreground",
        description: "補助テキスト",
      },
      {
        name: "muted-foreground",
        cssVar: "--muted-foreground",
        description: "placeholder・薄いテキスト",
      },
    ],
  },
  {
    label: "Accent",
    tokens: [
      {
        name: "accent-lime",
        cssVar: "--accent-lime",
        description: "PlayBtn・SubmitBtn",
      },
      { name: "doing", cssVar: "--doing", description: "作業中インジケーター" },
      {
        name: "doing-foreground",
        cssVar: "--doing-foreground",
        description: "作業中アイコン",
      },
    ],
  },
  {
    label: "Border / Input",
    tokens: [
      { name: "border", cssVar: "--border", description: "デフォルト枠線" },
      {
        name: "border-hover",
        cssVar: "--border-hover",
        description: "ホバー時枠線（未使用）",
      },
      { name: "input", cssVar: "--input", description: "input背景" },
      { name: "ring", cssVar: "--ring", description: "フォーカスリング" },
    ],
  },
  {
    label: "Badge",
    tokens: [
      { name: "badge-today", cssVar: "--badge-today", description: "今日" },
      {
        name: "badge-yesterday",
        cssVar: "--badge-yesterday",
        description: "昨日",
      },
      {
        name: "badge-tomorrow",
        cssVar: "--badge-tomorrow",
        description: "明日",
      },
      {
        name: "badge-last-week",
        cssVar: "--badge-last-week",
        description: "先週",
      },
      {
        name: "badge-next-week",
        cssVar: "--badge-next-week",
        description: "来週",
      },
      { name: "badge-past", cssVar: "--badge-past", description: "過去" },
      { name: "badge-future", cssVar: "--badge-future", description: "未来" },
    ],
  },
];

function ColorSwatch({
  name,
  cssVar,
  description,
}: {
  name: string;
  cssVar: string;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 shrink-0 rounded-lg border border-border"
        style={{ background: `var(${cssVar})` }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-dm-mono text-xs font-medium text-foreground">
          {name}
        </span>
        <span className="font-dm-mono text-2xs text-muted-foreground">
          {cssVar}
        </span>
        {description && (
          <span className="text-2xs text-muted-foreground">{description}</span>
        )}
      </div>
    </div>
  );
}

export const All: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-background p-8">
      <h1 className="mb-8 text-lg font-bold text-foreground">Color Tokens</h1>
      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <section key={group.label}>
            <h2 className="mb-4 font-dm-mono text-xs font-semibold tracking-widest text-primary-foreground uppercase">
              {group.label}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {group.tokens.map((token) => (
                <ColorSwatch key={token.name} {...token} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  ),
};
