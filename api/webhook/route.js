export async function POST(req) {
  const body = await req.json();

  console.log("Webhook recebido:", JSON.stringify(body, null, 2));

  return new Response("EVENT_RECEIVED", { status: 200 });
}
