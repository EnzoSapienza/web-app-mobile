import BASE_URL from '.';
import type Artwork from '../../interfaces/Responses/Artwork';
import type { ListResponse } from '../../interfaces/Responses/ListResponse';

export default async function GetArtworksList(
  limit: number,
  page: number
): Promise<Artwork[]> {
  const url: string = `${BASE_URL}/artworks?limit=${limit}&&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const content: ListResponse = await response.json();
  return content.data;
}
