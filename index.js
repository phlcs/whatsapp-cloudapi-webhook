const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const VERIFY_TOKEN = 'sellbieToken2025'; // Altere se quiser

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
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
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
