import { proxyToOwnApi } from "@/lib/auth/ownRequest";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ kind: string; entityId: string }> },
) {
  const { kind, entityId } = await params;

  return proxyToOwnApi(
    `/favorites/${encodeURIComponent(kind)}/${encodeURIComponent(entityId)}`,
    { method: "DELETE" },
  );
}
