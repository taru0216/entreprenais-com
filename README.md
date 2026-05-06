# entreprenais-com

樽石デジタル技術研究所 (TDRI) / EntreprenAIs コーポレートサイトの **Docker 配布版**。
`caddy:2-alpine` をベースに `_content/` 配下の静的アセットを配信する。

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
| `Dockerfile` | `caddy:2-alpine` ベースの production image |
| `Caddyfile` | リバースプロキシ + `/healthz` |
| `entrypoint.sh` | `AUTH_USER` / `AUTH_PASS` で Basic 認証を有効化 |
| `__service.json` | EntreprenAIs ランタイム (eai-ext-docker) 用の宣言 |
| `__post_bootstrap.sh` | docker-static template の post-bootstrap hook (no-op) |
| `_content/` | 静的アセット (Caddy が `/srv/` 配下から配信) |

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

## 関連プロジェクト

- [`taruishi-llc-homepage`](https://github.com/taru0216/taruishi-llc-homepage): GitHub Pages で apex (`entreprenais.com`) を担当する静的配信
- 本リポジトリ: ランタイム配布用の Docker image ソース (Caddy)

## ライセンス

Copyright (c) 2026 樽石デジタル技術研究所合同会社
