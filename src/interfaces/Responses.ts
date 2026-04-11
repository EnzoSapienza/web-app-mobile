import type Artwork from './Artwork';

export interface SingleResponse {
  pagination: Pagination;
  data: Artwork;
  info: ResponseInfo;
  config: ResponseConfig;
}

export interface ListResponse {
  pagination: Pagination;
  data: Artwork[];
  info: ResponseInfo;
  config: ResponseConfig;
}

export interface ResponseInfo {
  license_text: string;
  license_links: string[];
  version: string;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

export interface ResponseConfig {
  iiif_url: string;
  website_url: string;
}
