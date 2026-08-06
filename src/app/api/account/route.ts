import { auth } from "@clerk/nextjs/server";
import { isClerkConfigured, isOwner } from "@/lib/auth-config";

export async function GET() {
  if (!isClerkConfigured()) {
    return Response.json({ error: "Authentication is not configured" }, { status: 503 });
  }

  const { userId } = await auth();
  if (!isOwner(userId)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ userId, role: "owner" });
}
