import BASE_URL, { IMAGE_BASE_URL } from '.';
import type Artwork from '../../interfaces/Responses/Artwork';
import type { ListResponse } from '../../interfaces/Responses/Responses';

export default async function GetArtworksList(
  limit: number,
  page: number
): Promise<Artwork[]> {
  const url: string = `${BASE_URL}/artworks?limit=${limit}&page=${page}&fields=id,title,artist_display,image_id`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const content: ListResponse = await response.json();

  return content.data.map((art: Artwork) => ({
    ...art,

    imageUrl: art.image_id
      ? `${IMAGE_BASE_URL}/${art.image_id}/full/843,/0/default.jpg`
      : 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&h=600&auto=format&fit=crop',
  }));
}
