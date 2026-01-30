````md
# puffer_discord

Discord bot to manage PufferPanel game server instances.

## Features
- Manage PufferPanel servers from Discord (start/stop/status etc.)
- Configurable language via `src/config.json`

## Prerequisites
- Bun (recommended: the version used in this repo, e.g. `bun v1.1.40+`)
- (Optional) Docker & Docker Compose for containerized run
- A running PufferPanel instance (and API access)

> Bun can execute TypeScript files directly (e.g. `bun run index.ts`).  
> https://bun.com/docs/runtime/typescript

## Getting Started

### 1) Setup environment variables
Copy `.env.example` to `.env` and fill in the required values.

```bash
cp .env.example .env

**Common Discord variables (example)**

* `DISCORD_TOKEN`
* `DISCORD_CLIENT_ID`
* `DISCORD_GUILD_ID`

> The actual required keys are defined in `.env.example`. Keep `.env` secret.

### 2) Install dependencies

```bash
bun install
```

### 3) Run locally

```bash
bun run index.ts
```

## Run with Docker

```bash
docker compose up -d
```

Useful commands:

```bash
docker compose logs -f
docker compose ps
docker compose down
docker compose up -d --build
```

## Configuration

Language settings can be changed in `src/config.json`.

* Edit the language-related key(s) in `src/config.json`
* Restart the bot after changes

## Notes (PufferPanel API)

If this bot calls the PufferPanel API with authentication, ensure your token/header setup is correct.
PufferPanel API requests typically require an `Authorization: Bearer <token>` header.

Docs:

* [https://docs.pufferpanel.com/en/2.x/guides/common-problems.html](https://docs.pufferpanel.com/en/2.x/guides/common-problems.html)

## References

* [https://bun.com/docs/runtime](https://bun.com/docs/runtime)
* [https://bun.com/docs/runtime/typescript](https://bun.com/docs/runtime/typescript)
* [https://bun.com/docs/pm/cli/install](https://bun.com/docs/pm/cli/install)
* [https://docs.docker.com/guides/docker-compose/](https://docs.docker.com/guides/docker-compose/)
* [https://docs.docker.com/guides/docker-compose/common-questions/](https://docs.docker.com/guides/docker-compose/common-questions/)
* [https://docs.docker.jp/engine/reference/commandline/compose.html](https://docs.docker.jp/engine/reference/commandline/compose.html)
* [https://docs.pufferpanel.com/en/2.x/guides/common-problems.html](https://docs.pufferpanel.com/en/2.x/guides/common-problems.html)

## License

MIT License

```
::contentReference[oaicite:0]{index=0}
```

