const Express = require('express');

const app = Express();

app.get('/good', (req, res) => {
  res.status(200).send('Ok');
});

app.get('/bad', (req, res) => {
  res.status(500).send('Sorry');
});

app.listen(process.env.PORT || 3000);
