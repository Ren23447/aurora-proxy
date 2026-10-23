const worker = {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get('url');

    if (!target) {
      return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    try {
      const response = await fetch(target, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
        }
      });

      const contentType = response.headers.get('content-type') || 'text/plain';

      if (contentType.includes('text/html')) {
        const html = await response.text();
        const rewritten = rewriteHtml(html, target);

        return new Response(rewritten, {
          status: response.status,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store'
          }
        });
      }

      return new Response(response.body, {
        status: response.status,
        headers: {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Proxy failed',
        detail: error.message
      }), {
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

function rewriteHtml(html, sourceUrl) {
  const base = new URL(sourceUrl);

  return html.replace(/(src|href)=(["'])(.*?)\2/gi, (match, attr, quote, value) => {
    if (!value || value.startsWith('data:') || value.startsWith('javascript:') || value.startsWith('#')) {
      return match;
    }

    try {
      const resolved = new URL(value, base.href);
      return `${attr}=${quote}/proxy?url=${encodeURIComponent(resolved.href)}${quote}`;
    } catch {
      return match;
    }
  });
}

export default worker;
