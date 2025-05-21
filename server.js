const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
const dataPath = path.join(__dirname, 'data', 'progresso.json');

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

function getTodayKey() {
  const today = new Date();
  return today.toISOString().slice(0, 10); // yyyy-mm-dd
}

// Inicializa arquivo de progresso
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '{}');
}

app.get('/status', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath));
  const todayKey = getTodayKey();
  const progresso = data[todayKey] || [false, false, false, false, false];
  res.json(progresso);
});

app.post('/progresso', (req, res) => {
  const { index, checked } = req.body;
  const todayKey = getTodayKey();
  const data = JSON.parse(fs.readFileSync(dataPath));
  if (!data[todayKey]) data[todayKey] = [false, false, false, false, false];
  data[todayKey][index] = checked;
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
