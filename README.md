# 余白

GitHub Pagesで公開できる、Jekyllベースの静的Weblogです。

## ローカル起動

```sh
bundle install
bundle exec jekyll serve --baseurl ""
```

`http://localhost:4000` を開きます。

## GitHub Pages

リポジトリの Settings → Pages で、公開元を `Deploy from a branch` にし、
対象ブランチのルートを指定してください。

サイト名とURLは `_config.yml` で変更できます。

## 投稿

各投稿は`_diary/YYYYMMDDN.md`として追加します。

```text
_diary/202606081.md
```

ファイル名がそのままURLになります。同じ日に2件目を書く場合は末尾を `2` にします。

```text
_diary/202606082.md
```

この場合、URLは`/202606082/`、タイトルは`2026.06.08-2`になります。`layout`や`permalink`のfront matterは不要です。

GitHub Pages/JekyllにMarkdownとして処理させるため、各ファイルの先頭には空のfront matterだけ置きます。

```markdown
---
---

本文
```

## 月別ページ

新しい月に最初の投稿を作るときは、`pages/YYYYMM.html`も追加します。

```yaml
---
layout: month
title: "2026.06"
month: "202606"
permalink: /202606/
---
```

カスタムプラグインを使わないため、GitHub Pagesの標準Jekyllビルドで公開できます。
