# 実装計画 — 時系列分析のすすめ

設計書: [design.md](./design.md)

各フェーズ末で `pnpm typecheck && pnpm lint && pnpm test && pnpm build` を通す。

## Phase 1: 基盤(型・データ層・レイアウト)

1. `lib/types.ts` — ContentBlock / Lecture / Method / Example / Topic / SeriesFile 型定義
2. `data/` — 各 JSON の初期データ(講義2件・手法3件・例1件・動向1件+系列1ファイル程度のシード)
3. `lib/data.ts` — アクセサ実装 + 整合性テスト(`lib/data.test.ts`)
4. `app/layout.tsx` — メタデータ実値化、`components/elements/nav.tsx` 追加
5. `app/page.tsx` — トップページ(サイト概要+4セクション導線)

**完了条件**: トップ表示、ナビ遷移(リンク先は未実装で404可)、データテスト green

## Phase 2: コンテンツ描画基盤

1. `components/content/blocks.tsx` — paragraph / heading / list / note / code の描画
2. `components/elements/card.tsx`, `tag.tsx`
3. `app/lectures/page.tsx` + `app/lectures/[slug]/page.tsx`(`generateStaticParams` / `generateMetadata`)
4. レンダリングテスト(講義詳細スモーク)

**完了条件**: 講義一覧→詳細が JSON 起点で静的生成される

## Phase 3: 手法・動向ページ

1. `app/methods/page.tsx`(カテゴリ別グルーピング)+ `[slug]/page.tsx`
2. `app/topics/page.tsx`(新着順)+ `[slug]/page.tsx`
3. 相互参照リンク(関連手法・関連例)コンポーネント

**完了条件**: 4セクション中3セクションが完成、相互リンク動作

## Phase 4: 可視化

1. `components/charts/scale.ts` — スケール・目盛り計算(純関数)+ 単体テスト
2. `line-chart.tsx` / `axis.tsx` — SVG 折れ線(単一・複数系列)
3. `chart.tsx` ディスパッチャ + ContentBlock `chart` タイプの描画接続
4. `app/examples/page.tsx` + `[slug]/page.tsx`
5. `bar-chart.tsx` / `scatter-chart.tsx` / `decomposition.tsx`

**完了条件**: 例示ページで系列 JSON からチャート描画、scale テスト green

## Phase 5: コンテンツ拡充・仕上げ

1. 講義シリーズ執筆(基礎: 時系列の性質・定常性 → 古典: AR/MA/ARIMA → 応用)
2. 手法リファレンス拡充(カテゴリ全体をカバー)
3. 可視化例の追加(実データ系列の追加)
4. `math` ブロック表示改善(KaTeX 導入判断)
5. `sitemap.ts` / `robots.ts` / OGP
6. チャートのホバーインタラクション("use client" 化)

**完了条件**: 全セクションにコンテンツ、`out/` 生成しデプロイ可能

## 留意点

- Phase 1–4 は構造優先、コンテンツはシード最小限。執筆は Phase 5 に集約
- チャートは静的描画を先行し、インタラクションは最後(SSG との相性確認を早期に)
- 依存追加は KaTeX 判断時のみ。それまでゼロ追加を維持
