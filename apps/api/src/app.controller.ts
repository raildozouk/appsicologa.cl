// appsicologa.cl — AppController (health)
// TS_LOCAL: 2026-02-18
// TS_UTC: 2026-02-18
import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "./db/prisma.service";

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("health")
  health() {
    return { ok: true };
  }

  @Get("health/db")
  async healthDb() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { ok: true, db: { ok: true } };
    } catch {
      throw new ServiceUnavailableException({ ok: false, db: { ok: false } });
    }
  }
}
