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

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]
