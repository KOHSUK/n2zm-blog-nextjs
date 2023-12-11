<div align="center">
    <h1>n2zm-blog-nextjs</h1>
    <p>Simple Blog template using Notion API</p>

![GitHub Repo stars](https://img.shields.io/github/stars/KOHSUK/n2zm-blog-nextjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## What is this?

This is a simple blog template using Notion API.
Powered by [notion-to-zenn-markdown](https://github.com/KOHSUK/notion-to-zenn-md) and [zenn-markdown-html](https://github.com/zenn-dev/zenn-editor), you can easily create a blog with rich contents such as code blocks with syntax highlighting, embeded link cards, mermaid diagrams, and so on.

## How to use this template?

## Setup

利用するには以下の手順で設定を行います。

1. テンプレートからリポジトリを作成する

   ![use template](/assets/images/use-template.png)

2. NotionのIntegrationの設定を行う

   Notionの[Integration Dashboard](https://www.notion.com/my-integrations)にアクセスし、新しいIntegrationを作成します。

   ![create integration](/assets/images/create-integration.png)

   ここでは、「My Blog」という名前で作成しました。

   ![my blog integration](/assets/images/my-blog-integration.png)

   作成したIntegrationのSecretを保存しておきます。

   ![save secrets](/assets/images/save-secrets.png)

   本テンプレートでは、Notionのユーザー情報（名前とアイコン）を利用するため、ユーザー情報の取得を許可します。

   Capabilitiesから、User Capabilitiesのうち「Read user information without email addresses」を選択します。

   ![user capability](/assets/images/user-capability.png)

   参考：[公式ドキュメント- Build your first integration - ](https://developers.notion.com/docs/create-a-notion-integration)

3. Notionのテンプレートを複製する

   [こちらのNotion のテンプレート](https://kosuke-kihara.notion.site/b9121b4b2e234370815facbd5b6d50da?v=0a2505824ce441dfb42632dbe14bcc0a&pvs=4)を自身のアカウントに複製します。

   ページの右端の「・・・」から「Duplicate page」をクリックしてください。

   ![duplicate page](/assets/images/duplicate-page.png)

   自身のNotionアカウントに追加するかどうかを問う以下の様なダイアログが出てくるので、「Add to Private」をクリックしてください。

   ![add template](/assets/images/add-template.png)

   すると以下のように、ブログ記事管理用のデータベースのテンプレートが複製されます。

   ![template database](/assets/images/template-database.png)

4. データベースにコネクションの設定をする

   複製したデータベースのページの右上にある「・・・」をクリック、「＋Add connections」から先ほど作成した、Integrationを設定します。

   今回の例ではIntegrationを「My Blog」という名前で作成しましたので、それを選択します。

   ![add connection](/assets/images/add-connection.png)

5. リポジトリをクローンする
6. 環境変数を設定する

   次に環境変数を設定します。クローンしたリポジトリのフォルダ直下に `.env.sample` というファイルがあるので、これを同階層にコピーして `.env.local` ファイルを作成してください。

   ```text
   BASE_URL="http://localhost:3000"

   # Notion API
   NOTION_TOKEN=
   NOTION_DATABASE_ID=
   ```

   `NOTION_TOKEN` には作成した、IntegrationのSecretを貼り付けてください。

   `NOTION_DATABASE_ID` に設定するのは先ほど複製したテンプレートのデータベースのIDです。

   データベースのIDを取得するには、データベースのページの右上の「・・・」から「Copy link」をクリックしてください。

   ![copy link](/assets/images/copy-link.png)

   コピーされたリンクは以下のいずれかの様な形になっています。赤枠で囲っているところがデータベース IDです。

   ![urls](/assets/images/urls.png)

7. `npm i` でDependenciesをインストールする

   クローンしたリポジトリのディレクトリをターミナルで開き、 `npm i` を実行します。

8. Next.jsを起動する

   `npm run dev` で開発サーバーを起動します。

   ![running server](/assets/images/runnning-server.png)
