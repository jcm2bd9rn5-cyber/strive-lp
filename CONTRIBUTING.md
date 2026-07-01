# Contributing to Strive LP

## はじめに

Strive LP プロジェクトへの貢献をありがとうございます！このドキュメントでは、貢献方法についての基本的なガイドラインを説明します。

---

## 🤝 貢献方法

### 1. Issue を報告する

バグを見つけた場合や改善案がある場合は、[GitHub Issues](https://github.com/jcm2bd9rn5-cyber/strive-lp/issues) で報告してください。

**Issue 作成時のテンプレート:**

```markdown
## 説明
[問題の詳しい説明]

## 再現手順
1. ...
2. ...

## 期待される動作
[どのようになるべきか]

## 実際の動作
[実際に起きていること]

## 環境
- OS: 
- ブラウザ: 
- デバイス: 
```

### 2. Pull Request を送信する

1. **フォークする**
   ```bash
   git clone https://github.com/YOUR_USERNAME/strive-lp.git
   cd strive-lp
   ```

2. **ブランチを作成する**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **変更を加える**
   - HTML/CSS を編集
   - テストを追加（該当する場合）

4. **コミットする**
   ```bash
   git commit -m "feat: Add your feature description"
   ```
   
   **Commit メッセージの形式:**
   - `feat:` - 新機能
   - `fix:` - バグ修正
   - `docs:` - ドキュメント更新
   - `style:` - フォーマット変更
   - `refactor:` - コード整理
   - `perf:` - パフォーマンス改善
   - `test:` - テスト追加

5. **プッシュして PR を作成**
   ```bash
   git push origin feature/your-feature-name
   ```

---

## 📝 コード規約

### HTML

```html
<!-- セマンティック HTML5 を使用 -->
<header>
  <nav>
    <!-- ナビゲーション -->
  </nav>
</header>

<!-- 適切なインデント（2スペース） -->
<section>
  <div class="container">
    <!-- コンテンツ -->
  </div>
</section>
```

### CSS

```css
/* BEM 命名規則を使用 -->
.block { }
.block__element { }
.block--modifier { }

/* 適切なコメント */
/* セクションの説明 */
.section {
  margin: 2rem 0;
  padding: 1rem;
}
```

### ファイル構成

```
strive-lp/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── images/
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## ✅ チェックリスト

PR を提出する前に、以下を確認してください：

- [ ] HTML は有効で（W3C 準拠）
- [ ] CSS は整理されている
- [ ] モバイルレスポンシブで表示される
- [ ] アクセシビリティ対応（aria-label など）
- [ ] 画像は最適化されている
- [ ] ドキュメントが更新されている
- [ ] コミットメッセージが明確である
- [ ] 既存の機能を壊していない

---

## 🎨 デザイン原則

- **シンプルさ** - 不要な複雑さを避ける
- **アクセシビリティ** - すべてのユーザーに対応
- **パフォーマンス** - 高速読み込みを優先
- **モダンデザイン** - 最新のベストプラクティスを採用

---

## 📊 パフォーマンス目標

- ⚡ Lighthouse スコア: 90 以上
- 📱 モバイル表示: 完全対応
- 🚀 ページ読み込み時間: 1 秒以下
- ♿ アクセシビリティ: A11y レベル AA

---

## 📚 参考資料

- [MDN Web Docs](https://developer.mozilla.org/)
- [W3C HTML Validation](https://validator.w3.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 💬 質問やサポート

- GitHub Discussions: [Strive LP Discussions](https://github.com/jcm2bd9rn5-cyber/strive-lp/discussions)
- メール: jcm2bd9rn5@privaterelay.appleid.com
- Twitter/X: [@jcm2bd9rn5](https://twitter.com/jcm2bd9rn5)

---

**貢献をお待ちしています！** 🚀
