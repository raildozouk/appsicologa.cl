// appsicologa.cl — AI Controller
// TS_LOCAL: 2026-02-18T01:21:25-03:00
// TS_UTC: 2026-02-18T04:21:25+00:00
import { Body, Controller, Post } from "@nestjs/common";
import { AiService } from "./ai.service";
import { AiChatDto } from "./dto/ai-chat.dto";

@Controller("internal/ai")
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post("chat")
  chat(@Body() dto: AiChatDto) {
    return this.ai.chat(dto);
  }
}
