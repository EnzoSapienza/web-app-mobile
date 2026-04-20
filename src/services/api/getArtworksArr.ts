import type Artwork from '../../interfaces/Responses/Artwork';
import GetArtwork from './getArtwork';

export default async function GetArtworksArr(
  artworks_ids: number[]
): Promise<(Artwork | undefined)[]> {
  const artworkFetchArr = artworks_ids.map(async (id) => await GetArtwork(id));

  return await Promise.all(artworkFetchArr);
}
