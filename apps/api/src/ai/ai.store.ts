// appsicologa.cl — AI File Store (dev)
// TS_LOCAL: 2026-02-18T01:21:25-03:00
// TS_UTC: 2026-02-18T04:21:25+00:00
import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { getAiVarDir } from "./ai.paths";

export type AiConversationState = {
  conversationId: string;
  lastResponseId?: string;
  updatedAt: string;
};

@Injectable()
export class AiStore {
  private safeId(id: string): string {
    return id.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 120);
  }

  private statePath(conversationId: string): string {
    const base = getAiVarDir();
    return path.join(base, `${this.safeId(conversationId)}.json`);
  }

  async load(conversationId: string): Promise<AiConversationState | null> {
    const p = this.statePath(conversationId);
    try {
      const raw = await fs.promises.readFile(p, "utf8");
      const obj = JSON.parse(raw) as AiConversationState;
      if (!obj || obj.conversationId !== conversationId) return null;
      return obj;
    } catch {
      return null;
    }
  }

  async save(state: AiConversationState): Promise<void> {
    const base = getAiVarDir();
    await fs.promises.mkdir(base, { recursive: true });

    const p = this.statePath(state.conversationId);
    const tmp = `${p}.tmp.${Date.now()}`;

    await fs.promises.writeFile(tmp, JSON.stringify(state, null, 2), "utf8");
    await fs.promises.rename(tmp, p);
  }
}
