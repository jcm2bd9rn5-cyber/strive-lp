# Strive — Slide-faithful Premium LP

技育展2026のシネマティックなデザインを参考にした、筋トレ記録アプリStriveの静的LP。

- **本物のアプリスクリーンショット**: `assets/home.webp`, `assets/record.webp`, `assets/analytics.webp`, `assets/battle.webp` は技育展制作時に共有された画像をWebPに最適化したものです。
- **背景画像**: 完成版スライドからの背景と、画像生成したジムの写真素材の一部を背景専用に使用。生成された偽のアプリUIは使っていません。
- **デザイン**: ハイコントラストの黒×深紅、レイヤードiPhone、エディトリアルな文字設計、余白、統一したスクロールモーション。
- **静的サイト**: `index.html`, `style.css`, `main.js` のみ。npmインストール不要。
- **ユーザビリティ**: キーボード操作、`prefers-reduced-motion`対応、320〜1440pxのブラウザ検証済み。
- **公開**: 本番のmainは未変更。Draft PRからPreviewをご確認ください。

## ローカル確認

```bash
python3 -m http.server 4173
```

`http://localhost:4173/` をブラウザで開くか、直接 `index.html` を開きます。

## リンク

[App Store](https://apps.apple.com/jp/app/strive/id6770878590) · [プライバシーポリシー](https://jcm2bd9rn5-cyber.github.io/strive-legal/)
