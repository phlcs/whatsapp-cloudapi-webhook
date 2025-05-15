export default function handler(req, res) {
  const VERIFY_TOKEN = 'sellbieToken2025';

  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  if (req.method === 'POST') {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
      const entries = body.entry || [];
      entries.forEach(entry => {
        const changes = entry.changes || [];
        changes.forEach(change => {
          const messages = change.value?.messages || [];
          messages.forEach(message => {
            console.log('Mensagem recebida:', JSON.stringify(message, null, 2));
          });
        });
      });
      return res.sendStatus(200);
    }

    return res.sendStatus(404);
  }

  res.sendStatus(405);
}
