export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = "token-teste";

  if (mode && token === VERIFY_TOKEN) {
    console.log("Webhook verificado com sucesso");
    return new Response(challenge, { status: 200 });
  } else {
    console.warn("Falha na verificação");
    return new Response("Forbidden", { status: 403 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Payload recebido (POST):", JSON.stringify(body, null, 2));
    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error("Erro no webhook:", err);
    return new Response("Erro interno do servidor", { status: 500 });
  }
}

