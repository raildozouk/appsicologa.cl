type Health = { ok: boolean };

async function getHealth(): Promise<Health | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001/v1";
  try {
    const res = await fetch(`${base}/health`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Health;
  } catch {
    return null;
  }
}

export default async function Page() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001/v1";
  const health = await getHealth();

  return (
    <main>
      <h1>AppPsicologa — Web</h1>
      <p>
        API base: <code>{base}</code>
      </p>
      <p>
        Health: <code>{health ? JSON.stringify(health) : "NO-CONNECT"}</code>
      </p>
      <p>
        Swagger:{" "}
        <a href="http://127.0.0.1:3001/docs" target="_blank" rel="noreferrer">
          http://127.0.0.1:3001/docs
        </a>
      </p>
    </main>
  );
}
