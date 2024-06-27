const RAPIDAPI_KEY = '86e318a648msh9033e53809ae9bep144c72jsn01e7450f4a84';
const API_HOST = 'pinterest-scraper.p.rapidapi.com';

const searchImages = async (query) => {
  const url = `https://${API_HOST}/search/?keyword=${encodeURIComponent(query)}`;
  console.log(`Fetching images from URL: ${url}`);

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
    return data.items;
  } catch (error) {
    console.error('Failed to fetch images:', error);
    return [];
  }
};

export default searchImages;

