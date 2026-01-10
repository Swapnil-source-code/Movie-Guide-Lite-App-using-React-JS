exports.handler = async (event) => {
  const { title } = event.queryStringParameters || {};

  if (!title) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Movie title is required" })
    };
  }

  const API_KEY = process.env.OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch movie data" })
    };
  }
};
