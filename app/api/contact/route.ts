export async function POST(request: Request) {
  const payload = await request.json();

  if (!payload.name || !payload.email || !payload.message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  return Response.json({
    ok: true,
    receivedAt: new Date().toISOString(),
    lead: payload
  });
}
