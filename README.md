# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## ブランチ構成

- `main`：本番環境用（安定版）
- `dev`：開発ブランチ（普段はこちらで作業しています）



# Nocchi App 🕒📘

> 思考と成長を記録する、作業タイマー × ChatGPT × Notion 連携アプリ

---

## 📌 概要

Nocchi Appは、作業タイマー・質問フォーム・AI補助を組み合わせた「思考と学習の記録アプリ」です。
Pomodoro式の集中サイクルに合わせて、ChatGPTへの質問とNotionへの知識蓄積を自然に行えます。

---

## 🚀 機能一覧

- ✅ 50分集中／10分休憩のポモドーロタイマー
- ✅ ChatGPT APIを用いた質問フォーム（リアルタイム回答）
- ✅ Notion APIで質問＆回答を知識DBに自動保存（※今後実装予定）
- ✅ デスクトップ通知、Notionページ自動オープン（Electron）

---

## 🛠 使用技術

| 分野 | 技術 |
|------|------|
| フロントエンド | Vue 3, Vite, Vuetify 3 |
| バックエンド | Node.js（Electron） |
| 外部連携 | OpenAI API（gpt-4o）, Notion API |
| その他 | `.env` による秘密キー管理 |

---

## ⚙️ セットアップ手順

### 1. このリポジトリをクローン

```bash
git clone https://github.com/YanagisawaKaori/Nocchi-app.git
cd Nocchi-app
2. 依存関係のインストール
bash
コードをコピーする
npm install
3. .env ファイルの作成
.env.example をコピーして .env を作成し、OpenAIのAPIキーを入力します。

bash
コードをコピーする
cp .env.example .env
env
コードをコピーする
VITE_OPENAI_API_KEY=your-openai-key-here
4. 開発サーバーの起動
bash
コードをコピーする
npm run dev
📁 ディレクトリ構成（簡略）
csharp
コードをコピーする
Nocchi-app/
├── public/
├── src/
│   ├── App.vue         # メイン画面
│   └── main.js         # Vuetify設定＆マウント
├── .env.example        # APIキーの例
├── vite.config.js
└── package.json


📚 開発者メモ
開発ブランチは dev

本番リリース時は main にマージ

.env ファイルは .gitignore 済みで非公開です

✨ 今後の展望
 Notion APIとの連携強化（質問＋回答を自動保存）

 タグ付け機能（質問内容のジャンル分け）

 Chat履歴検索機能の追加

 モバイル対応・リマインド機能強化


👤 作者
@YanagisawaKaori

元教員 → エンジニア見習い

子ども・教育・自己成長に関心あり


🦀 開発サポート by カニ
このREADMEは、ChatGPTの中の“カニ”によってレビュー・監修されています🦀

