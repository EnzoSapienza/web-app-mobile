import type Artwork from './Artwork';
import type Pagination from './Pagination';
import type ResponseConfig from './ResponseConfig';
import type ResponseInfo from './ResponseInfo';

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
