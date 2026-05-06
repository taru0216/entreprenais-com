FROM caddy:2-alpine

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY Caddyfile /etc/caddy/Caddyfile
COPY _content/ /srv/

EXPOSE 8080

ENTRYPOINT ["entrypoint.sh"]
