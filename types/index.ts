export interface Game {
  id: string;
  name: string;
  image: string;
  thumbnail: string;
  rating_count: number;
  rating_average: number;
  owned_count: number;
  weight_average: number;
  year_published: number;
  category_score: number;
  categories: string[];
  ranks: {
    [key: string]: number;
  };
  colors: string[];
}

export type SortMode = 'name' | 'rating' | 'weight' | 'year' | 'popularity';

export type D3SvgSelection = d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
