import * as d3 from 'd3';
import Tree from './Tree';
import type { GameData, D3SvgSelection } from '~/types';

class Forest {
  trees: Tree[] = [];
  data: GameData[];
  svg: D3SvgSelection;
  minYear: number;
  maxYear: number;
  minOwnedNumber: number;
  maxOwnedNumber: number;
  minRating: number;
  maxRating: number;
  minWeight: number;
  maxWeight: number;
  minCategoryScore: number;
  maxCategoryScore: number;
  minNumberOfRatings: number;
  maxNumberOfRatings: number;

  constructor(data: GameData[], svg: D3SvgSelection) {
    this.svg = svg;
    this.data = data;

    this.minYear = Math.min(...data.map((datum) => datum.yearpublished));
    this.maxYear = Math.max(...data.map((datum) => datum.yearpublished));

    this.minOwnedNumber = Math.min(...data.map((datum) => datum.owned_number));
    this.maxOwnedNumber = Math.max(...data.map((datum) => datum.owned_number));

    this.minRating = Math.min(...data.map((datum) => datum.rating_average));
    this.maxRating = Math.max(...data.map((datum) => datum.rating_average));

    this.minWeight = Math.min(...data.map((datum) => datum.weight_average));
    this.maxWeight = Math.max(...data.map((datum) => datum.weight_average));

    this.minCategoryScore = Math.min(...this.data.map((datum) => datum.categoryScore));
    this.maxCategoryScore = Math.max(...this.data.map((datum) => datum.categoryScore));

    this.minNumberOfRatings = Math.min(...this.data.map((datum) => datum.number_of_ratings));
    this.maxNumberOfRatings = Math.max(...this.data.map((datum) => datum.number_of_ratings));

    this.init();
  }

  init() {
    // Year Published
    const lengthScale = d3.scaleLinear().domain([this.minYear, this.maxYear]).range([65, 40]);

    // Rating
    const lengthFactorScale = d3.scaleLinear().domain([this.minRating, this.maxRating]).range([0.78, 0.89]);
    const leafSizeScale = d3.scaleLinear().domain([this.minRating, this.maxRating]).range([10, 26]);

    // Weight
    // const depthScale = d3.scaleLinear().domain([this.minWeight, this.maxWeight]).range([4, 9]);
    const depthScale = d3.scaleLinear().domain([1, 4.5]).range([4, 9]);

    // Category Rarity
    // const ratioBranchAngleScale = d3.scaleLinear().domain([this.minCategoryScore, this.maxCategoryScore]).range([4, 6]);

    // Owned Number
    const branchAngleScale = d3
      .scaleLinear()
      .domain([this.minOwnedNumber, this.maxOwnedNumber])
      .range([Math.PI / 12, Math.PI / 4]);

    // Number of Ratings
    // const branchAngleScale = d3
    //   .scaleLinear()
    //   .domain([this.minNumberOfRatings, this.maxNumberOfRatings])
    //   .range([Math.PI / 12, Math.PI / 4]);

    for (let i = 0; i < this.data.length; i++) {
      const datum = this.data[i];
      const initialLength = Math.min(Math.max(lengthScale(datum.yearpublished), 40), 65);
      const maxDepth = depthScale(datum.weight_average);
      const branchAngle = branchAngleScale(datum.number_of_ratings);
      const lengthFactor = lengthFactorScale(datum.rating_average);
      // const ratioBranchAngle = ratioBranchAngleScale(datum.categoryScore);
      const ratioBranchAngle = 5;
      const leafSize = leafSizeScale(datum.rating_average);
      const colors = datum.colors;

      const t = new Tree(i, datum, initialLength, maxDepth, branchAngle, ratioBranchAngle, lengthFactor, leafSize, colors);
      this.trees.push(t);
    }
  }

  draw() {
    this.trees.forEach((tree) => {
      tree.init(this.svg);
      tree.draw();
    });
  }
}

export default Forest;
