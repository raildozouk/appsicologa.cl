// appsicologa.cl — PrismaModule (Nest)
// TS_LOCAL: 2026-02-18
// TS_UTC: 2026-02-18
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
