import * as d3 from 'd3';
import Tree from './Tree';
import type { GameData, D3SvgSelection } from '~/types';

import { useInteractionStore } from '~/stores/interaction';

class Forest {
  store: ReturnType<typeof useInteractionStore>;
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

  constructor(data: GameData[], svg: D3SvgSelection, store: ReturnType<typeof useInteractionStore>) {
    this.store = store;
    this.svg = svg;
    this.data = data;

    this.minYear = Math.min(...data.map((datum) => datum.year_published));
    this.maxYear = Math.max(...data.map((datum) => datum.year_published));

    this.minOwnedNumber = Math.min(...data.map((datum) => datum.owned_count));
    this.maxOwnedNumber = Math.max(...data.map((datum) => datum.owned_count));

    this.minRating = Math.min(...data.map((datum) => datum.rating_average));
    this.maxRating = Math.max(...data.map((datum) => datum.rating_average));

    this.minWeight = Math.min(...data.map((datum) => datum.weight_average));
    this.maxWeight = Math.max(...data.map((datum) => datum.weight_average));

    this.minCategoryScore = Math.min(...this.data.map((datum) => datum.category_score));
    this.maxCategoryScore = Math.max(...this.data.map((datum) => datum.category_score));

    this.minNumberOfRatings = Math.min(...this.data.map((datum) => datum.rating_count));
    this.maxNumberOfRatings = Math.max(...this.data.map((datum) => datum.rating_count));

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
      const initialLength = Math.min(Math.max(lengthScale(datum.year_published), 40), 65);
      const maxDepth = depthScale(datum.weight_average);
      const branchAngle = branchAngleScale(datum.rating_count);
      const lengthFactor = lengthFactorScale(datum.rating_average);
      // const ratioBranchAngle = ratioBranchAngleScale(datum.categoryScore);
      const ratioBranchAngle = 5;
      const leafSize = leafSizeScale(datum.rating_average);
      const colors = datum.colors;

      const t = new Tree(this.store, i, datum, initialLength, maxDepth, branchAngle, ratioBranchAngle, lengthFactor, leafSize, colors);
      this.trees.push(t);
    }
  }

  draw() {
    console.log('Drawing forest...');
    this.trees.forEach((tree) => {
      tree.init(this.svg);
      tree.draw();
      tree.interaction();
    });
  }
}

export default Forest;
