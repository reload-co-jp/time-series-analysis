# 詳細設計書 — 時系列分析のすすめ

https://tsa.reload.co.jp

## 1. 目的とスコープ

時系列分析を体系的に学べる講義・手法解説・可視化例示・最新手法の紹介を行う静的サイト。

- コンテンツは JSON 形式で保持し、ビルド時に静的生成(SSG)する
- サーバ・DB・API は持たない(Next.js `output: "export"` による完全静的配信)
- 検索・インタラクティブ可視化はクライアントサイドで完結させる

## 2. 技術スタック(確定済み)

- Next.js 16(App Router, `output: "export"`, `trailingSlash: true`)
- React 19 / TypeScript
- Vitest + Testing Library
- pnpm / ESLint / Prettier
- スタイリング: インラインスタイル(既存 `components/elements/layout.tsx` の方式を踏襲)
- 可視化: 依存追加なしの自作 SVG コンポーネント(軽量・静的エクスポート親和)
  - 必要になった時点で軽量ライブラリ導入を再検討

## 3. 情報設計

### 3.1 コンテンツ分類

1. **講義(lectures)** — 体系的に学ぶ順序付きコンテンツ。章立てで基礎→応用へ
2. **手法(methods)** — 個別手法のリファレンス。カテゴリ分類・講義から相互参照
3. **可視化例(examples)** — 実データ/合成データに手法を適用した結果の例示
4. **最新動向(topics)** — 最新手法の紹介と示唆。日付順の記事形式

### 3.2 ルーティング

```
/                       トップ(サイト概要・各セクションへの導線)
/lectures/              講義一覧(章立て順)
/lectures/[slug]/       講義詳細
/methods/               手法一覧(カテゴリ別)
/methods/[slug]/        手法詳細
/examples/              可視化例一覧
/examples/[slug]/       可視化例詳細
/topics/                最新動向一覧(新着順)
/topics/[slug]/         最新動向詳細
```

全動的ルートは `generateStaticParams` で JSON から静的生成。

### 3.3 相互参照

- 講義 → 関連手法(`relatedMethods: slug[]`)
- 手法 → 関連可視化例(`relatedExamples: slug[]`)、関連手法(`relatedMethods: slug[]`)
- 最新動向 → 関連手法(`relatedMethods: slug[]`)

## 4. データ設計

### 4.1 配置

```
data/
  lectures.json     講義メタ一覧+本文
  methods.json      手法一覧+本文
  examples.json     可視化例一覧+本文+系列データ参照
  topics.json       最新動向一覧+本文
  series/           可視化用の時系列データ(1系列群=1ファイル)
    airline-passengers.json
    synthetic-arima.json
    ...
```

### 4.2 スキーマ(TypeScript 型 = 正)

型定義は `lib/types.ts` に置き、JSON はこれに従う。

```ts
// 本文はブロックの列。Markdown 依存を避け構造化する
type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "math"; tex: string } // 数式(表示は段階導入)
  | { type: "code"; language: string; code: string }
  | { type: "chart"; seriesRef: string; chartType: ChartType; caption?: string }
  | { type: "note"; text: string } // 補足・示唆

type Lecture = {
  slug: string
  order: number // 体系的な学習順
  chapter: string // 章名(基礎/モデル/応用 など)
  title: string
  description: string
  blocks: ContentBlock[]
  relatedMethods: string[]
}

type Method = {
  slug: string
  category: MethodCategory // "基礎統計" | "古典的モデル" | "状態空間" | "機械学習" | "深層学習"
  title: string
  description: string
  blocks: ContentBlock[]
  relatedMethods: string[]
  relatedExamples: string[]
}

type Example = {
  slug: string
  title: string
  description: string
  methodSlug: string // 適用した手法
  seriesRef: string // data/series/ のファイル名(拡張子なし)
  chartType: ChartType
  blocks: ContentBlock[] // 解釈・考察
}

type Topic = {
  slug: string
  publishedAt: string // ISO 8601
  title: string
  description: string
  blocks: ContentBlock[]
  relatedMethods: string[]
}

type ChartType = "line" | "multi-line" | "bar" | "scatter" | "decomposition"

// data/series/*.json
type SeriesFile = {
  name: string
  unit?: string
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  series: {
    label: string
    points: { t: string; v: number }[] // t: ISO 8601 日付
  }[]
}
```

### 4.3 データアクセス層

`lib/data.ts` に集約。ページから JSON を直接 import しない。

```ts
getLectures(): Lecture[]            // order 昇順
getLecture(slug): Lecture
getMethods(): Method[]              // カテゴリ別グルーピングはヘルパで
getMethod(slug): Method
getExamples(): Example[]
getExample(slug): Example
getTopics(): Topic[]                // publishedAt 降順
getTopic(slug): Topic
getSeries(ref): SeriesFile
```

- ビルド時(サーバコンポーネント)でのみ実行。`fs` 読み込みではなく静的 import で完結
- slug 不在時は `notFound()`
- Vitest でスキーマ整合性(slug 重複なし、相互参照の解決可能性、seriesRef 実在)を検証するテストを持つ

## 5. コンポーネント設計

```
components/
  elements/
    layout.tsx        既存: Header/Main/Footer/Title(拡張: ナビゲーション)
    nav.tsx           グローバルナビ(講義/手法/例/動向)
    card.tsx          一覧用カード(タイトル+説明+メタ)
    tag.tsx           カテゴリ・章ラベル
  content/
    blocks.tsx        ContentBlock[] → 描画のディスパッチャ
    code-block.tsx    コード表示
    math-block.tsx    数式表示(初期: <code> 表示、後続で KaTeX 等検討)
  charts/
    chart.tsx         chartType ディスパッチャ("use client")
    line-chart.tsx    折れ線(単一/複数系列)
    bar-chart.tsx     棒
    scatter-chart.tsx 散布図
    decomposition.tsx トレンド/季節/残差の分解表示(複数パネル)
    axis.tsx, scale.ts  共通軸・スケール計算(純関数、テスト対象)
```

### 5.1 チャート方針

- SVG 直描画。`viewBox` + `width: 100%` でレスポンシブ
- スケール計算(`scale.ts`)は純関数として分離し単体テスト
- インタラクション(ホバー値表示)はクライアントコンポーネントで段階導入。初期は静的描画のみ
- ダークトーン背景(既存 `#222`)に合わせた配色

### 5.2 ページ構成(共通パターン)

- 一覧ページ: セクション見出し + Card グリッド(講義は章ごと、手法はカテゴリごと)
- 詳細ページ: タイトル + メタ + `<Blocks blocks={...} />` + 関連リンク
- `generateMetadata` で title/description を JSON から設定

## 6. サイト共通

- `app/layout.tsx`: メタデータ実値化(「時系列分析のすすめ」)、`<Nav />` 追加、フッター表記
- OGP・`sitemap.ts`・`robots.ts` は静的エクスポート対応の範囲で実装
- アクセシビリティ: チャートに `role="img"` + `aria-label`、ナビにランドマーク

## 7. テスト方針

- `lib/data.ts`: データ整合性テスト(参照解決・slug 一意性・日付形式)
- `charts/scale.ts`: スケール・目盛り計算の単体テスト
- 主要ページ: レンダリングスモークテスト(Testing Library)
- CI 相当: `pnpm typecheck && pnpm lint && pnpm test && pnpm build` が通ること

## 8. 非機能

- ビルド: 全ページ SSG。系列データはページ単位で import し、バンドル肥大を回避
- パフォーマンス: 追加ランタイム依存ゼロを維持(チャート自作の理由)
- 配信: `next build` の `out/` を静的ホスティングへ(tsa.reload.co.jp)
