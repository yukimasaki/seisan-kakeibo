export const markdownString = `
# 概要
Webアプリケーション開発の勉強と実益を兼ねて作成中の家計簿アプリです。  
グループ間の立て替え・精算機能を搭載する予定です。  
現状は、ユーザ登録とログイン、メンバーの招待機能を実装済みです。
買い物データの登録機能は未実装です。  
Keycloakによる認証・認可に対応しています。  
フロントエンドとバックエンドは共にTypeScriptで開発しています。

### URL
[https://seisan.youmaro.jp](https://seisan.youmaro.jp)

### デモユーザー
- ID: sample1@example.com  
- PW: KhVamcT3

# 技術スタック
### ホスティング
- 自宅サーバー (Proxmox)

### リバースプロキシ
- Caddy

各種サービスのリバースプロキシとして機能しています。  
セキュリティのためHTTP(80) / HTTPS(443)ポートのみ公開しています。  
SSL証明書 (Let's Encrypt)の自動取得・自動更新を実施しています。

### APIゲートウェイ
- Kong Gateway

バックエンドをマイクロサービスとして管理しやすくするためにAPIゲートウェイを採用しています。  
将来的に、APIやブログを公開する予定です。

### 仮想化
- Docker

開発環境を素早く準備するためにDockerコンテナを採用しています。
コンテナ間の通信はDocker Networkによって行っています。

### フロントエンド
- Next.js (TypeScript)
- NextUI
- Tailwind CSS

Next.jsの前はVue (Nuxt3)やAngularを使用していました。  
Next.jsへ移行したきっかけは、Nuxt3のkeycloakアダプター(next-authのラッパーライブラリ)に不具合があったことです。  
また、JSX/TSXの、HTMLをJavaScriptのオブジェクトの一部として扱うという考えは、TypeScriptの型推論との相性が良く開発体験が向上しました。

### バックエンド
- NestJS (TypeScript)
- Prisma
- PostgreSQL

フロントエンドと同じくTypeScriptによる開発が可能なNestJSを採用しています。

- Redis

メンバー招待機能のキャッシュとして、データに有効期限を設定可能なRedisを採用しています。

- Swagger

APIのドキュメント作成ツールとして採用しています。

### 認証・認可
- Keycloak
- next-auth

Keycloakを採用してOIDCによる認証、OAuthによるエンドポイントの認可を組み込んでいます。

### テスト
- Jest

コードを安全にリファクタリングしたいという欲求からJestを採用しました。  
勉強中のため、まだ一部のコードしかテストを実施できていません。

### エディタ
- Cursor
- GPT-4 API

VSCodeをフォークして作られたCursorというエディタを使っています。  
有償ですがChatGPTのAPIキーを設定することでGPT-4 Turboを利用可能です。  
プロジェクト内のコード群やファイル単体をもとに質問を行うことができるためプロンプトの作成が容易になりました。
`;
