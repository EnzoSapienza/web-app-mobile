import type Thumbnail from './Thumbnail';

export default interface Artwork {
  id: number;
  api_model: string;
  api_link: string;
  title: string;
  alt_titles: string[];
  thumbnail: Thumbnail;
  main_reference_number: string;
  date_start: number;
  date_end: number;
  artist_display: string;
  place_of_origin: string;
  description: string;
  short_description: string;
  image_id: string;
  alt_image_ids: string[];
}
