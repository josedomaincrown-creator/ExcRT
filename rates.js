// Server-side proxy for the exchange rate API.
// The real API key lives ONLY in Netlify's environment variables — set it there,
// never in this file, never in git.
//
// Netlify dashboard → Site configuration → Environment variables → add:
//   EXCHANGE_RATE_API_KEY = your_key_here

exports.handler = async (event) => {
  const API_KEY = "efc51f7b031da6bc97edfc7c";
  const base = event.queryStringParameters?.base || "USD";

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server misconfigured: missing API key" }),
    };
  }

  try {
    // Exchange Rate API v6 format — adjust path if you use a different provider
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.result !== "success") {
      return { statusCode: 502, body: JSON.stringify({ error: "Upstream rate provider error" }) };
    }

    // Reshape into { BASE: { QUOTE: rate, ... } } so the frontend can look up any pair
    const reshaped = { [base]: data.conversion_rates };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300", // cache 5 min at the edge to save API quota
      },
      body: JSON.stringify(reshaped),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch rates" }) };
  }
};
