export async function onRequest(context) {
  // Access environment variable bound in Cloudflare
  const apiKey = context.env.EXCHANGE_RATE_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "API key environment variable is missing" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const apiResponse = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
    const data = await apiResponse.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch exchange rates" }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
