export default async function handler(req, res) {
  try {
    console.log("Requisição recebida:", req.method);

    // Validação do token (GET)
    if (req.method === "GET") {
      const VERIFY_TOKEN = "token-teste"; // mesmo usado no setup da Meta
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];

      if (mode && token === VERIFY_TOKEN) {
        console.log("Webhook verificado com sucesso");
        return res.status(200).send(challenge);
      } else {
        console.warn("Falha na verificação do webhook");
        return res.sendStatus(403);
      }
    }

    // Tratamento de mensagens (POST)
    if (req.method === "POST") {
      console.log("Payload recebido (POST):", JSON.stringify(req.body, null, 2));
      return res.sendStatus(200); // resposta obrigatória para a Meta
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Erro no handler do webhook:", error);
    res.status(500).send("Erro interno do servidor");
  }
}

