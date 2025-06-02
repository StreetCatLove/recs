addEventListener('fetch', e => e.respondWith(handleRequest(e.request)))
async function handleRequest(request) {
  const { pathname, search } = new URL(request.url);
  const apiKey = `your_api_key`;
  const ytURL = `https://www.googleapis.com/youtube/v3${pathname}${search}&key=${apiKey}`;
  console.log(ytURL);
  let response = await fetch(ytURL);
  response = new Response(response.body, response);
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all

  return response;
}
