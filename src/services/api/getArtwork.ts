import BASE_URL from '.';
import type Artwork from '../../interfaces/Responses/Artwork';

export default async function GetArtwork(artwork_id: number): Promise<Artwork> {
  const url = `${BASE_URL}/artworks/${artwork_id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const content = await response.json();
  return content.data;
}
