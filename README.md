# My App — 普段使いできるWebアプリの土台

`git push` するだけで本番に反映される、GitHub Pages 直結のWebアプリ雛形です。

## ライフライン（コード → 毎日使える状態）

```
コード編集 → git push → GitHub Actions が自動ビルド → https://ywdcmbxqwd-ux.github.io/-/ で公開
             （HTTPS込み・スマホからも見れる・無料・常時稼働）
```

- 中身: `public/index.html`（ここを書き換えて push すれば数十秒で反映）
- 配線: `.github/workflows/deploy.yml`（push を検知して自動デプロイ）

## 初回だけ必要な手動ステップ（僕が代われない1箇所）

GitHub の権限上、Pages の有効化トグルだけはあなたの操作が要ります:

1. リポジトリの **Settings → Pages** を開く
2. **Build and deployment → Source** を **「GitHub Actions」** に変更
3. このブランチをデフォルトブランチ（または `main`）へマージ

→ 以降は完全自動。push した瞬間に本番へ流れます。

## ローカルで確認する

```bash
cd public && python3 -m http.server 8099
# ブラウザで http://localhost:8099/
```

## これから中身を作る

`public/index.html` を土台に機能を足していけます。規模が大きくなったら
Vite などのビルドツールを入れて `public/` に出力すれば、配線はそのまま使えます。
