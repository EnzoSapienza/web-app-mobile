import type Artwork from '../../interfaces/Responses/Artwork';
import GetArtwork from './getArtwork';

interface IdsArr {
  id: number;
  artwork?: Artwork;
}

export default async function GetArtworksArr(
  artworks_ids: IdsArr[]
): Promise<IdsArr[]> {
  const artworkFetchArr = artworks_ids.map(async (i) => {
    const artwork = await GetArtwork(i.id);
    i.artwork = artwork;
  });

  await Promise.all(artworkFetchArr);
  return artworks_ids;
}
