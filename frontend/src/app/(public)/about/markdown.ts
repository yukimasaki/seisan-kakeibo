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

### APIゲートウェイ
- Kong Gateway

### 仮想化
- Docker

### フロントエンド
- Next.js (TypeScript)
- NextUI
- Tailwind CSS

### バックエンド
- NestJS (TypeScript)
- Prisma
- PostgreSQL
- Redis
- Swagger

### 認証・認可
- next-auth
- Keycloak

### エディタ
- Cursor
- GPT-4 API
`;
