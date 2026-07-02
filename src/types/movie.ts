export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
}

export interface Movie {
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  alternative_names: string[];
  type: string;
  thumb_url: string;
  poster_url: string;
  year: number;
  category: Category[];
  country: Country[];
}

export interface EpisodeSource {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface EpisodeServer {
  server_name: string;
  is_ai: boolean;
  server_data: EpisodeSource[];
}

export interface ExternalRating {
  id: string;
  vote_average: number;
  vote_count: number;
  type?: string;
}

export interface MovieDetail extends Movie {
  content: string;
  status: string;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  lang_key: string[];
  view: number;
  actor: string[];
  director: string[];
  episodes: EpisodeServer[];
  tmdb: ExternalRating;
  imdb: ExternalRating;
}

export interface MovieImageSizes {
  backdrop: Record<string, string>;
  poster: Record<string, string>;
}

export interface MovieImage {
  width: number;
  height: number;
  aspect_ratio: number;
  type: "backdrop" | "poster";
  file_path: string;
}

export interface MoviePeople {
  tmdb_people_id: number;
  adult: boolean;
  gender: number;
  gender_name: string;
  name: string;
  original_name: string;
  character: string;
  known_for_department: string;
  profile_path: string;
}

export interface MovieKeyword {
  tmdb_keyword_id: number;
  name: string;
  name_vn: string;
}

export interface Pagination {
  currentPage: number;
  totalItems: number;
  totalItemsPerPage: number;
  totalPages?: number;
}

export interface Breadcrumb {
  name: string;
  slug?: string;
  isCurrent: boolean;
}

export interface SeoOnPage {
  titleHead: string;
  descriptionHead: string;
}

export interface TaxonomyItem {
  _id: string;
  slug: string;
  name: string;
}
