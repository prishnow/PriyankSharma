/// <reference types="@cloudflare/workers-types" />

interface Env {
  REACTIONS: KVNamespace;
}

const VALID_KEYS = new Set(["thoughtful", "relatable", "good", "loved", "mind"]);
const ARTICLE_ID_RE = /^[a-z0-9-]{1,64}$/;

type Counts = Record<string, number>;
const emptyCounts = (): Counts => ({
  thoughtful: 0,
  relatable: 0,
  good: 0,
  loved: 0,
  mind: 0,
});

async function readCounts(env: Env, articleId: string): Promise<Counts> {
  const raw = await env.REACTIONS.get(articleId);
  if (!raw) return emptyCounts();
  try {
    const parsed = JSON.parse(raw);
    return { ...emptyCounts(), ...parsed };
  } catch {
    return emptyCounts();
  }
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

function validArticleId(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  return ARTICLE_ID_RE.test(raw) ? raw : null;
}

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const articleId = validArticleId(params.articleId);
  if (!articleId) return jsonResponse({ error: "invalid articleId" }, 400);
  const counts = await readCounts(env, articleId);
  return jsonResponse(counts);
};

export const onRequestPost: PagesFunction<Env> = async ({ request, params, env }) => {
  const articleId = validArticleId(params.articleId);
  if (!articleId) return jsonResponse({ error: "invalid articleId" }, 400);

  let body: unknown;
  try { body = await request.json(); }
  catch { return jsonResponse({ error: "invalid json" }, 400); }

  const key = (body as { key?: unknown })?.key;
  if (typeof key !== "string" || !VALID_KEYS.has(key)) {
    return jsonResponse({ error: "invalid reaction key" }, 400);
  }

  // Non-atomic read-modify-write. Concurrent writes can drop a click.
  // Accepted trade-off for a personal site; migrate to D1 if this ever matters.
  const counts = await readCounts(env, articleId);
  counts[key] = (counts[key] || 0) + 1;
  await env.REACTIONS.put(articleId, JSON.stringify(counts));
  return jsonResponse(counts);
};
