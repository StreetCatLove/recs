addEventListener('fetch', e => e.respondWith(handleRequest(e.request)))
async function handleRequest(request) {
  const { pathname, search } = new URL(request.url);
  const twitchURL = `https://api.twitch.tv/helix${pathname}${search}`;
  console.log(twitchURL);
  let response = await fetch(twitchURL, {
    headers: {
      'Authorization': 'Bearer your_token',
      'Client-Id': 'your_CID'
    }
  });
  response = new Response(response.body, response);
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*'); 

  return response;
}
