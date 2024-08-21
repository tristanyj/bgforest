export interface GameData {
  id: string;
  name: string;
  description: string;
  image: string;
  thumbnail: string;
  categories: string[];
  number_of_ratings: number;
  rating_average: number;
  owned_number: number;
  rank: {
    [key: string]: number;
  };
  weight_average: number;
  yearpublished: number;
  categoryScore: number;
  colors: string[];
}

export type D3SvgSelection = d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
