# Appsicologa — DEV Stack (Docker Compose)

## 1) Setup
- Copy env:
  cp infra/dev/.env.example infra/dev/.env

- Start:
  docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml up -d

## 2) URLs / Ports
- Postgres/PostGIS: localhost:5432
- Redis: localhost:6379
- MeiliSearch: http://localhost:7700
- MinIO S3: http://localhost:9000
- MinIO Console: http://localhost:9001

## 3) Stop
docker compose --env-file infra/dev/.env -f infra/dev/docker-compose.yml down
