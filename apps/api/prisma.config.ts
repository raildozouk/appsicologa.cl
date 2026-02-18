import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: {
    // Importante: Prisma CLI sempre carrega o config.
    // Para comandos que não precisam de DB, evitamos falhar se DATABASE_URL não estiver setada.
    // Para migrate/db, você DEVE setar DATABASE_URL (via .env ou export).
    url: process.env.DATABASE_URL ?? "",
  },
});
