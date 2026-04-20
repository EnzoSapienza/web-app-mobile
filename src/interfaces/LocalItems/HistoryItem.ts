import type Artwork from '../Responses/Artwork';

export default interface HistoryItem {
  id: number;
  artwork?: Artwork;
}
