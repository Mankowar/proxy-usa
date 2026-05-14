const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
 if (req.method === 'POST') {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
   // Извлекаем ключ из URL
   const keyMatch = req.url.match(/key=([^&]+)/);
   const key = keyMatch ? keyMatch[1] : '';

   const options = {
    hostname: 'generativelanguage.googleapis.com',
    port: 443,
    path: `/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
   };

   const proxyReq = https.request(options, proxyRes => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
   });

   proxyReq.on('error', e => {
    res.writeHead(500);
    res.end(JSON.stringify({ error: e.message }));
   });

   proxyReq.write(body);
   proxyReq.end();
  });
 } else {
  res.writeHead(200);
  res.end('Proxy is running');
 }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});
