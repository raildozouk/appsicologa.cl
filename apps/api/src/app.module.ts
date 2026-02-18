import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AiModule } from "./ai/ai.module";
import { PrismaModule } from "./db/prisma.module";

@Module({
  imports: [AiModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
