require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.get('/', (req, res, next) => {
  res.status(200).send('Welcome to our server!!')
});