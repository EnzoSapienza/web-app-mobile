import BASE_URL, { IMAGE_BASE_URL } from '.';
import type Artwork from '../../interfaces/Responses/Artwork';

export default async function GetArtwork(
  artwork_id: number
): Promise<Artwork | undefined> {
  const url = `${BASE_URL}/artworks/${artwork_id}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    console.error('Sin conexión o error de red. Id:', artwork_id);
    return undefined;
  }

  try {
    // Probar si se recibió bién
    const content = await response.json();
    const artwork: Artwork = content.data;
    artwork.imageUrl = `${IMAGE_BASE_URL}/${artwork.image_id}/full/full/0/default.jpg`;
    return artwork;
  } catch (error) {
    console.error('Error en obtener una obra: ', error, 'Id: ', artwork_id);
    return;
  }
}
