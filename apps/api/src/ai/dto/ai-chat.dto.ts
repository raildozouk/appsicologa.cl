// appsicologa.cl — AI DTO
// TS_LOCAL: 2026-02-18T01:21:25-03:00
// TS_UTC: 2026-02-18T04:21:25+00:00
import { IsOptional, IsString, MaxLength } from "class-validator";

export class AiChatDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  conversationId?: string;

  @IsString()
  @MaxLength(8000)
  message!: string;
}
