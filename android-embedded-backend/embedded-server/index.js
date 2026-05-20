const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const { scrapeHtml } = require('./scraper');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const result = await scrapeHtml(url);
    return res.json(result);
  } catch (error) {
    console.error('Embedded scrape error:', error);
    return res.status(500).json({ error: error.message || 'Embedded scrape failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Embedded backend listening on http://127.0.0.1:${PORT}`);
});
