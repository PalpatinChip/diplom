const RAPIDAPI_KEY = '86e318a648msh9033e53809ae9bep144c72jsn01e7450f4a84';
const API_HOST = 'news-api14.p.rapidapi.com';

const searchArticles = async (query) => {
  const url = `https://${API_HOST}/v2/search/articles?query=${encodeURIComponent(query)}&language=ru`;
  console.log(`Fetching articles from URL: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': API_HOST,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
};

export default searchArticles;
