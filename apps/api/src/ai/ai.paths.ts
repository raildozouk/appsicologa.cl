// appsicologa.cl — AI Paths/IO helpers
// TS_LOCAL: 2026-02-18T01:21:25-03:00
// TS_UTC: 2026-02-18T04:21:25+00:00
import * as fs from "fs";
import * as path from "path";

export function findRepoRoot(startDir: string): string {
  let dir = startDir;
  for (let i = 0; i < 8; i++) {
    if (
      fs.existsSync(path.join(dir, "pnpm-workspace.yaml")) ||
      fs.existsSync(path.join(dir, ".git"))
    ) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return startDir;
}

export function getAiVarDir(): string {
  const repoRoot = findRepoRoot(process.cwd());
  return path.join(repoRoot, "var", "ai");
}

export function getProjectStatePath(): string {
  const repoRoot = findRepoRoot(process.cwd());
  return path.join(repoRoot, "docs", "PROJECT_STATE.md");
}

export async function readProjectState(): Promise<string> {
  const p = getProjectStatePath();
  try {
    return await fs.promises.readFile(p, "utf8");
  } catch {
    return "";
  }
}
