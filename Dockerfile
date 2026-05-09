FROM caddy:2-alpine

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY Caddyfile /etc/caddy/Caddyfile

# 静的コンテンツは repo root に直接配置されている (#1412)。
# Pages SSOT 化のため _content/ から root に展開済み。
# Docker ビルド時に Pages 関連ファイル (CNAME, README.md) を除外しつつ
# HTML/CSS/JS/画像のみを /srv/ にコピーする。
COPY index.html /srv/index.html
COPY style.css /srv/style.css
COPY main.js /srv/main.js
COPY img/ /srv/img/
COPY privacy/ /srv/privacy/
COPY terms/ /srv/terms/
COPY eai/ /srv/eai/
# eai/ の再帰コピーで eai/showcase/ も /srv/eai/showcase/ に展開される (#15)
COPY sites/ /srv/sites/
# sites/ 配下に代行開発した暫定公開サイトを配置（#17 島田クレープ等）

# SEO assets (#13)
COPY robots.txt /srv/robots.txt
COPY sitemap.xml /srv/sitemap.xml
COPY site.webmanifest /srv/site.webmanifest
COPY og.png /srv/og.png
COPY favicon.svg /srv/favicon.svg
COPY favicon-16.png /srv/favicon-16.png
COPY favicon-32.png /srv/favicon-32.png
COPY apple-touch-icon.png /srv/apple-touch-icon.png

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]
