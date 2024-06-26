const RAPIDAPI_KEY = '86e318a648msh9033e53809ae9bep144c72jsn01e7450f4a84';
const API_HOST = 'youtube-search-and-download.p.rapidapi.com';

const searchVideos = async (query) => {
  const url = `https://${API_HOST}/search?query=${encodeURIComponent(query)}&type=video`;
  console.log(`Fetching videos from URL: ${url}`);

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
    return data.contents;
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return [];
  }
};

export default searchVideos;
