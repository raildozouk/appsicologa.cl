// appsicologa.cl — AI Module
// TS_LOCAL: 2026-02-18T01:21:25-03:00
// TS_UTC: 2026-02-18T04:21:25+00:00
import { Module } from "@nestjs/common";
import { AiController } from "./ai.controller";
import { AiService } from "./ai.service";
import { AiStore } from "./ai.store";

@Module({
  controllers: [AiController],
  providers: [AiService, AiStore],
})
export class AiModule {}
