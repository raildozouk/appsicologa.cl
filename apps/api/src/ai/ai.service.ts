// appsicologa.cl — AI Service (OpenAI Responses API)
// TS_LOCAL: 2026-02-18T01:21:25-03:00
// TS_UTC: 2026-02-18T04:21:25+00:00
import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { randomUUID } from "crypto";
import { AiChatDto } from "./dto/ai-chat.dto";
import { AiStore } from "./ai.store";
import { readProjectState } from "./ai.paths";

@Injectable()
export class AiService {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor(private readonly store: AiStore) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // fail fast: better than running “half broken”
      throw new Error("OPENAI_API_KEY is not set");
    }
    this.client = new OpenAI({ apiKey });
    this.model = process.env.OPENAI_MODEL || "gpt-5";
  }

  async chat(dto: AiChatDto): Promise<{ conversationId: string; responseId: string; text: string }> {
    const conversationId = dto.conversationId?.trim() || randomUUID();
    const prev = await this.store.load(conversationId);

    const projectState = await readProjectState();

    const system =
      [
        "Você é o copiloto interno do repositório appsicologa.cl.",
        "Regras de trabalho: resposta direta e técnica; para infra/devops: 1 comando por vez.",
        "Idioma: PT-BR por padrão. Se o pedido for copy/UX público para Chile, responda em espanhol es-CL.",
        "Segurança: não peça/exponha segredos; não inclua PII/PHI; trate dados internos como sensíveis.",
        "",
        "=== PROJECT_STATE.md (canônico) ===",
        projectState || "(PROJECT_STATE.md não encontrado)",
      ].join("\n");

    const resp = await this.client.responses.create({
      model: this.model,
      truncation: "auto",
      previous_response_id: prev?.lastResponseId,
      input: [
        { role: "system", content: system },
        { role: "user", content: dto.message },
      ],
    });

    const text = (resp as any).output_text || "";
    await this.store.save({
      conversationId,
      lastResponseId: (resp as any).id,
      updatedAt: new Date().toISOString(),
    });

    return { conversationId, responseId: (resp as any).id, text };
  }
}
