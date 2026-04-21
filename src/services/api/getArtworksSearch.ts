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
  const from = Math.min((page - 1) * limit, 1000 - limit);
  const hasQuery = q && q.trim() !== '';
  const hasFilters = !!(type || origin || style);
  
  // Define keyword: '*' para carga inicial, texto si existe query, vacío si solo filtros
  const keyword = hasQuery ? q.trim() : (hasFilters ? '' : '*');
  
  const mustQueries: any[] = [];

  // Agrega query_string si existe keyword
  if (keyword) {
    mustQueries.push({
      query_string: {
        query: keyword
      }
    });
  }

  // Agrega filtros como términos exactos obligatorios
  if (type) {
    mustQueries.push({ term: { "classification_titles.keyword": type } });
  }
  if (origin) {
    mustQueries.push({ term: { "place_of_origin.keyword": origin } });
  }
  if (style) {
    mustQueries.push({ term: { "style_titles.keyword": style } });
  }

  // Encapsula lógica en params con JSON estructurado
  const queryPayload = {
    query: {
      bool: {
        must: mustQueries
      }
    }
  };

  const url = `${BASE_URL}/artworks/search?params=${encodeURIComponent(JSON.stringify(queryPayload))}&limit=${limit}&from=${from}&fields=id,title,artist_display,image_id`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.statusText}`);
    }

    const content = await response.json();

    if (!content.data || content.data.length === 0) {
      return [];
    }

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
