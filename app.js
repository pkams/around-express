const express = require('express');
const cards = require('./routes/cards'); // importando o roteador
const users = require('./routes/users'); // importando o roteador
// escute o port 3000
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', cards, users);

app.get('/', (req, res) => {
  res.status(404).send('Frontend ainda não conectado.');
});

app.get('*', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  // se tudo estiver funcionando, o console mostrará que a porta do aplicativo está escutando
  console.log(`O App está escutando na porta ${PORT}`);
});
