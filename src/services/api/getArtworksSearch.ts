import BASE_URL, { IMAGE_BASE_URL } from '.';
import type Artwork from '../../interfaces/Responses/Artwork';

interface SearchParams {
  page?: number;
  limit?: number;
  q?: string;
  type?: string;
  origin?: string;
  style?: string;
}

export default async function GetArtworksSearch({
  page = 1,
  limit = 10, // 10 por página
  q,
  type,
  origin,
  style,
}: SearchParams): Promise<Artwork[]> {
  const from = (page - 1) * limit;

  const queryParts: string[] = [];

  if (q && q.trim() !== '') queryParts.push(q.trim());
  if (type) queryParts.push(`classification_title:"${type}"`);
  if (origin) queryParts.push(`place_of_origin:"${origin}"`);
  if (style) queryParts.push(`style_title:"${style}"`);

  const finalQuery = queryParts.length > 0 ? queryParts.join(' AND ') : '*';
  const url = `${BASE_URL}/artworks/search?q=${encodeURIComponent(finalQuery)}&limit=${limit}&from=${from}&fields=id,title,artist_display,image_id`;

  try {
    const response = await fetch(url);
    const content = await response.json();
    if (!content.data) return [];
    return content.data.map((art: Artwork) => ({
      id: art.id,
      title: art.title || 'Untitled Piece',
      artist_display: art.artist_display || 'Unknown Artist',
      imageUrl: art.image_id
        ? `${IMAGE_BASE_URL}/${art.image_id}/full/400,/0/default.jpg`
        : 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    }));
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return [];
  }
}
