import { proxyToOwnApi } from "@/lib/auth/ownRequest";

export async function GET() {
  return proxyToOwnApi("/favorites");
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  return proxyToOwnApi("/favorites", {
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });
}
