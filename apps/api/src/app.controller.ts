// appsicologa.cl — AppController (health)
// TS_LOCAL: 2026-02-18
// TS_UTC: 2026-02-19
import { Controller, Get, Logger, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "./db/prisma.service";

function sanitize(msg: unknown): string {
  const s = String(msg ?? "");
  // remove qualquer URL postgres completa, se aparecer
  return s.replace(/postgres(?:ql)?:\/\/[^ \n\r\t"]+/gi, "postgresql://***redacted***").slice(0, 400);
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get("health")
  health() {
    return { ok: true };
  }

  @Get("health/db")
  async healthDb() {
    try {
      // unsafe aqui é OK: query fixa sem input do usuário
      const r = await this.prisma.$queryRawUnsafe("SELECT 1 AS ok");
      return { ok: true, db: { ok: true }, r };
    } catch (e: any) {
      const name = e?.name ? String(e.name) : "Error";
      const code = e?.code ? String(e.code) : undefined;
      const message = sanitize(e?.message ?? e);

      this.logger.error(`health/db failed name=${name} code=${code ?? "-"} msg=${message}`);

      throw new ServiceUnavailableException({
        ok: false,
        db: { ok: false },
        error: { name, code, message },
      });
    }
  }
}
