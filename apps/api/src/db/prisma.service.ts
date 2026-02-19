// appsicologa.cl — PrismaService (Nest) — Prisma v7 + adapter-pg (Pool)
// TS_LOCAL: 2026-02-18
// TS_UTC: 2026-02-19
import "dotenv/config";
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private readonly pool: Pool;

  constructor() {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not set (required to init PrismaClient)");
    }

    // adapter-pg espera um Pool (pg), não um objeto { connectionString }
    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);

    super({ adapter });

    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log("Prisma connected");
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } finally {
      await this.pool.end().catch(() => undefined);
      this.logger.log("Prisma disconnected");
    }
  }
}
