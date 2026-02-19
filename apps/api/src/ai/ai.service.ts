// appsicologa.cl — AiService (Ollama-only)
// TS_LOCAL: 2026-02-18
// TS_UTC: 2026-02-18
import "dotenv/config";
import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { AiChatDto } from "./dto/ai-chat.dto";

type AnyMsg = { role?: string; content?: string };

function buildPrompt(dto: any): string {
  // Compat: suporta dto.message, dto.prompt, dto.messages[]
  const msg = (dto?.message ?? dto?.prompt ?? "").toString().trim();

  const messages: AnyMsg[] = Array.isArray(dto?.messages) ? dto.messages : [];
  const history = messages
    .map((m) => `${(m.role ?? "user").toString().toUpperCase()}: ${(m.content ?? "").toString()}`)
    .join("\n")
    .trim();

  if (history) return history + (msg ? `\nUSER: ${msg}` : "") + "\nASSISTANT:";
  if (msg) return `USER: ${msg}\nASSISTANT:`;
  return "USER: Hola. Responde breve.\nASSISTANT:";
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  private readonly ollamaUrl = process.env.OLLAMA_URL || "http://127.0.0.1:11434/api/generate";
  private readonly ollamaModel = process.env.OLLAMA_MODEL || "qwen2.5:3b";

  constructor() {
    this.logger.log(`AI_PROVIDER=ollama url=${this.ollamaUrl} model=${this.ollamaModel}`);
  }

  // Método principal (mantém compat com controller atual)
  async chat(dto: AiChatDto | any) {
    const conversationId = dto?.conversationId || randomUUID();
    const prompt = buildPrompt(dto);

    const body = {
      model: this.ollamaModel,
      prompt,
      stream: false,
      options: { num_predict: 256 },
    };

    const r = await fetch(this.ollamaUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const t = await r.text().catch(() => "");
      throw new ServiceUnavailableException(
        `Ollama error: HTTP ${r.status} ${t}`.slice(0, 1200),
      );
    }

    const j: any = await r.json();
    const text = (j?.response ?? "").toString().trim();
    if (!text) throw new ServiceUnavailableException("Ollama returned empty response.");

    return { conversationId, provider: "ollama", model: this.ollamaModel, text };
  }

  // Aliases defensivos (se algum controller antigo chamar outro nome)
  async generate(dto: any) {
    return this.chat(dto);
  }
  async ask(dto: any) {
    return this.chat(dto);
  }
}
