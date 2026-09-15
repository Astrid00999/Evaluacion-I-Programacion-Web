const express = require('express');
const incidencias = require('./routes/incidencias');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/incidencias', incidencias);
app.use('/api/incidencias', incidencias);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});