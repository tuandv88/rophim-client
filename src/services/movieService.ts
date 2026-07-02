import { apiClient } from "../api/axios";
import { endpoints } from "../api/endpoints";
import type {
  HomeResponse,
  MovieDetailResponse,
  MovieImagesResponse,
  MovieKeywordsResponse,
  MovieListParams,
  MovieListResponse,
  MoviePeoplesResponse,
  RawTaxonomyItem,
  RawTaxonomyListResponse,
  SearchParams,
  SearchResponse,
  TaxonomyListResponse,
} from "../types/api";

function normalizeTaxonomyResponse(response: RawTaxonomyListResponse): TaxonomyListResponse {
  const items = Array.isArray(response.data) ? response.data : response.data?.items;

  return {
    ...response,
    data: Array.isArray(items) ? items.map(normalizeTaxonomyItem) : [],
  };
}

function normalizeTaxonomyItem(item: RawTaxonomyItem) {
  if ("year" in item) {
    const year = String(item.year);

    return {
      _id: year,
      slug: year,
      name: year,
    };
  }

  return item;
}

export const movieService = {
  async getHome() {
    const { data } = await apiClient.get<HomeResponse>(endpoints.home);
    return data;
  },

  async getMovieList(slug: string, params: MovieListParams) {
    const { data } = await apiClient.get<MovieListResponse>(endpoints.movieList(slug), {
      params,
    });
    return data;
  },

  async getCategories() {
    const { data } = await apiClient.get<RawTaxonomyListResponse>(endpoints.categories);
    return normalizeTaxonomyResponse(data);
  },

  async getCategoryMovies(slug: string, params: MovieListParams) {
    const { data } = await apiClient.get<MovieListResponse>(endpoints.categoryMovies(slug), {
      params,
    });
    return data;
  },

  async getCountries() {
    const { data } = await apiClient.get<RawTaxonomyListResponse>(endpoints.countries);
    return normalizeTaxonomyResponse(data);
  },

  async getCountryMovies(slug: string, params: MovieListParams) {
    const { data } = await apiClient.get<MovieListResponse>(endpoints.countryMovies(slug), {
      params,
    });
    return data;
  },

  async getYears() {
    const { data } = await apiClient.get<RawTaxonomyListResponse>(endpoints.years);
    return normalizeTaxonomyResponse(data);
  },

  async getYearMovies(year: string, params: MovieListParams) {
    const { data } = await apiClient.get<MovieListResponse>(endpoints.yearMovies(year), {
      params,
    });
    return data;
  },

  async getMovieDetail(slug: string) {
    const { data } = await apiClient.get<MovieDetailResponse>(endpoints.movieDetail(slug));
    return data;
  },

  async getMovieImages(slug: string) {
    const { data } = await apiClient.get<MovieImagesResponse>(endpoints.movieImages(slug));
    return data;
  },

  async getMoviePeoples(slug: string) {
    const { data } = await apiClient.get<MoviePeoplesResponse>(endpoints.moviePeoples(slug));
    return data;
  },

  async getMovieKeywords(slug: string) {
    const { data } = await apiClient.get<MovieKeywordsResponse>(endpoints.movieKeywords(slug));
    return data;
  },

  async searchMovies(params: SearchParams) {
    const { data } = await apiClient.get<SearchResponse>(endpoints.search, {
      params,
    });
    return data;
  },
};
