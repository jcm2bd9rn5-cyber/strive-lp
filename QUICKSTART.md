# 🚀 Quick Start Guide - Strive LP

## インストール

```bash
# クローン
git clone https://github.com/jcm2bd9rn5-cyber/strive-lp.git
cd strive-lp

# ローカルサーバーを起動
python -m http.server 8000
# または
npx http-server
```

👉 [http://localhost:8000](http://localhost:8000) にアクセス

---

## 📁 ファイル構成

```
strive-lp/
├── 📄 index.html           # メインページ
├── 📁 css/
│   ├── style.css          # メインスタイル
│   └── responsive.css     # レスポンシブ対応
├── 📁 images/             # 画像ファイル
├── 📄 README.md           # プロジェクト説明
├── 📄 CONTRIBUTING.md     # 貢献ガイド
├── 📄 CHANGELOG.md        # 変更履歴
├── 📄 ROADMAP.md          # 開発ロードマップ
└── 📄 LICENSE             # ライセンス
```

---

## 🔧 開発

### ページの追加

1. HTML ファイルを作成
2. CSS を `css/style.css` に追加
3. `index.html` にリンクを追加
4. テスト
5. PR を送信

### スタイル更新

```css
/* css/style.css */
.new-component {
  /* スタイルを記述 */
}
```

### 画像の最適化

```bash
# WebP への変換（推奨）
ffmpeg -i image.png -c:v libwebp -lossless 1 image.webp
```

---

## 🧪 テスト

### ローカルテスト

1. **複数ブラウザでテスト**
   - Chrome
   - Firefox
   - Safari
   - Edge

2. **レスポンシブテスト**
   - デスクトップ (1920px)
   - タブレット (768px)
   - モバイル (375px)

3. **パフォーマンステスト**
   ```bash
   # Chrome DevTools Lighthouse
   # または
   # https://pagespeed.web.dev/
   ```

---

## 🚀 デプロイ

### Vercel へのデプロイ

```bash
# Vercel CLI をインストール
npm install -g vercel

# デプロイ
vercel
```

自動デプロイ: `main` ブランチへのプッシュで自動的にデプロイされます。

---

## 📚 ドキュメント

- [README.md](README.md) - プロジェクト概要
- [CHANGELOG.md](CHANGELOG.md) - 変更履歴
- [ROADMAP.md](ROADMAP.md) - 開発予定
- [CONTRIBUTING.md](CONTRIBUTING.md) - 貢献方法

---

## 💡 Tips

- コミットメッセージは詳細に記述
- 定期的にプルして最新を保つ
- 大きな変更は Issue で相談
- テストを十分に実施

---

## 🆘 トラブルシューティング

### ポートがすでに使用されている

```bash
# 別のポートで起動
python -m http.server 8001
```

### キャッシュの問題

```bash
# ハード更新
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

### ビルドエラー

```bash
# ノードモジュールを再インストール
rm -rf node_modules
npm install
```

---

**問題がある場合は [GitHub Issues](https://github.com/jcm2bd9rn5-cyber/strive-lp/issues) で報告してください！**
