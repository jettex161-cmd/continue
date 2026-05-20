const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeHtml(url) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Android; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
    },
    timeout: 20000
  });

  const html = response.data;
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim();
  const description = $('meta[name="description"]').attr('content') || '';
  const links = [];

  $('a[href]').each((_, element) => {
    const href = $(element).attr('href');
    if (href) {
      links.push({ href: href.trim(), text: $(element).text().trim() });
    }
  });

  return {
    url,
    title,
    description,
    links,
    html: html.substring(0, 16000)
  };
}

module.exports = { scrapeHtml };
