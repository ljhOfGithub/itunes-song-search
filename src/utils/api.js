const API_BASE_URL = 'https://itunes.apple.com/search';

export const fetchSongs = async (term = 'Talyor+Swift', limit = 200, media = 'music') => {
  try {
    const url = `${API_BASE_URL}?term=${term}&limit=${limit}&media=${media}`;

    console.log('Fetching from iTunes API:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid API response format');
    }

    console.log(`API returned ${data.resultCount} results, using all available songs`);

    return data.results;

  } catch (error) {
    console.error('Error fetching songs from iTunes API:', error);
    throw error;
  }
};

export const paginateData = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    data: data.slice(startIndex, endIndex),
    totalPages: Math.ceil(data.length / pageSize),
    totalItems: data.length
  };
};