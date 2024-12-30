const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.all('/', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('Missing "url" query parameter');
  }

  const config = {
    method: req.method,
    url: url,
    headers: {
      ...req.headers
      },
  };

  if (req.method === 'POST') {
    config.data = req.body;
  }

  try {
    const response = await axios(config);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error forwarding the request:', error.message);
    res.status(500).send('Error forwarding the request');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
