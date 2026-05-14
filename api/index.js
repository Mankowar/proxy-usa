export const config = { runtime: 'edge', regions: ['iad1'] };
export default async function handler(req) {
 const url = new URL(req.url);
 const targetUrl = new URL('/v1beta/models/gemini-2.0-flash:generateContent' + url.search, 'https://generativelanguage.googleapis.com');
 const response = await fetch(targetUrl, { method: req.method, headers: { 'Content-Type': 'application/json' }, body: req.body });
 return new Response(response.body, { status: response.status, headers: response.headers });
}
