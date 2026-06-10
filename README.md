# Yuta Something

GitHub Pagesで公開する、Jekyllベースの個人Weblogです。

- 公開URL: <https://yutasth.github.io/weblog/>
- トップページには最新7件を表示
- 日付ベースの個別ページ
- 月別ページ、投稿カレンダー、全文検索
- 画像、タグ、フィード、プロフィール機能なし

## ローカル起動

初回のみ依存関係をインストールします。

```sh
bundle install
```

GitHub Pages用の`baseurl: "/weblog"`をローカルでは空にして起動します。

```sh
bundle exec jekyll serve --baseurl ""
```

<http://localhost:4000/>を開きます。

## 日記を書く

日記は`_diary/YYYYMMDDN.md`として追加します。`N`は同日内の連番です。

```text
_diary/202606091.md
```

Markdownの先頭には、Jekyllに処理させるための空front matterだけを置きます。

```markdown
---
---

本文
```

`layout`、`title`、`date`、`permalink`の指定は不要です。ファイル名から自動生成されます。

| ファイル | 表示タイトル | URL |
| --- | --- | --- |
| `202606091.md` | `2026.06.09` | `/202606091/` |
| `202606092.md` | `2026.06.09-2` | `/202606092/` |

大きな段落を区切る場合はMarkdownの水平線を使用します。

```markdown
---
```

## 月別ページ

月別ページは`_plugins/month_pages_generator.rb`が日記ファイルから自動生成します。

たとえば`_diary/202607011.md`を追加すると、次回ビルド時に`/202607/`が作られ、右側の年月一覧にも自動的にリンクが追加されます。月別ページ用のファイルを手動で作る必要はありません。

## GitHub Pages

このリポジトリは以下の設定を前提としています。

```yaml
url: "https://yutasth.github.io"
baseurl: "/weblog"
```

月別ページの自動生成にはカスタムJekyllプラグインを使うため、GitHub Actionsで通常のJekyllを実行してビルド・公開します。workflowは`.github/workflows/pages.yml`に含まれています。

GitHubで次のように設定します。

1. リポジトリの`Settings`を開く
2. `Pages`を開く
3. `Build and deployment`の`Source`を`GitHub Actions`にする

以後、`main`へpushするたびにworkflowがJekyllを自動ビルドし、GitHub Pagesへ公開します。状態はリポジトリの`Actions`タブで確認できます。

```sh
git add .
git commit -m "日記を追加"
git push origin main
```

## ビルド確認

公開前にローカルでビルドだけ確認する場合:

```sh
bundle exec jekyll build
```

生成物は`_site/`に出力されます。`_site/`や`vendor/`はGit管理対象外です。`Gemfile.lock`はGitHub Actionsとローカル環境の依存関係を揃えるためGit管理します。
