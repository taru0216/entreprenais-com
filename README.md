# entreprenais-com

樽石デジタル技術研究所 (TDRI) / EntreprenAIs コーポレートサイトの **SSOT** リポジトリ (#1412)。
本 repo がそのまま:

1. **GitHub Pages** で apex (`https://entreprenais.com/`) を配信する
2. **Docker** image (caddy:2-alpine) としてランタイム配布される

の 2 経路で静的アセットを公開する。

## 起動 (本番 / Docker)

```sh
docker build -t entreprenais-com .
docker run --rm -p 8080:8080 entreprenais-com
# → http://localhost:8080/  (healthz: /healthz)
```

`AUTH_USER` / `AUTH_PASS` を渡すと Basic 認証が有効化される (`entrypoint.sh`)。

```sh
docker run --rm -p 8080:8080 \
  -e AUTH_USER=admin -e AUTH_PASS=secret \
  entreprenais-com
```

## 構成

| ファイル | 役割 |
|---------|------|
| `index.html` / `style.css` / `main.js` / `img/` | 静的アセット (root 直接配置) |
| `CNAME` | GitHub Pages 用 custom domain (`entreprenais.com`) |
| `Dockerfile` | `caddy:2-alpine` ベースの production image |
| `Caddyfile` | リバースプロキシ + `/healthz` |
| `entrypoint.sh` | `AUTH_USER` / `AUTH_PASS` で Basic 認証を有効化 |
| `__service.json` | EntreprenAIs ランタイム (eai-ext-docker) 用の宣言 |
| `__post_bootstrap.sh` | docker-static template の post-bootstrap hook (no-op) |

> **配置ルール**: GitHub Pages は repo root を `/` に展開して配信するため、HTML/CSS/JS/画像は
> root 直接配置とする。Docker ビルド時に `Dockerfile` が必要分のみ `/srv/` にコピーする
> (`Dockerfile`, `Caddyfile`, `__*` は image に含めない)。

## EntreprenAIs ランタイム連携

本リポジトリは EntreprenAIs ランタイム (`eai-ext-docker`) で起動することを想定している。
`__service.json` は `runtime=docker` / `port=19009` / `healthz=/healthz` を宣言する。

```json
{
  "runtime": "docker",
  "port": 19009,
  "healthz_path": "/healthz",
  "dockerfile": "Dockerfile"
}
```

## ライセンス

Copyright (c) 2026 樽石デジタル技術研究所合同会社
