export default async function searchGoogleBooks(query: string) {
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        throw new Error(`Google Books API error: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("❌ Error fetching from Google Books API:", error);
      return { items: [] }; // Return empty array if there's an error
    }
  }
  