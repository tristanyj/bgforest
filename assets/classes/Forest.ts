import * as d3 from 'd3';
import Tree from './Tree';
import type { GameData, D3SvgSelection } from '~/types';

class Forest {
  categoryScoreChart: { [key: string]: number } = {};
  data: GameData[];
  trees: Tree[] = [];
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

    this.init();
  }

  init() {
    const lengthScale = d3.scaleLinear().domain([this.minYear, this.maxYear]).range([65, 40]);
    // const depthScale = d3.scaleLinear().domain([this.minWeight, this.maxWeight]).range([4, 9]);
    const depthScale = d3.scaleLinear().domain([1, 4.5]).range([4, 9]);
    const lengthFactorScale = d3.scaleLinear().domain([this.minRating, this.maxRating]).range([0.78, 0.89]);
    const ratioBranchAngleScale = d3.scaleLinear().domain([this.minCategoryScore, this.maxCategoryScore]).range([8, 3]);
    const leafSizeScale = d3.scaleLinear().domain([this.minRating, this.maxRating]).range([10, 26]);
    const branchAngleScale = d3
      .scaleLinear()
      .domain([this.minOwnedNumber, this.maxOwnedNumber])
      .range([Math.PI / 12, Math.PI / 4]);

    for (let i = 0; i < this.data.length; i++) {
      const datum = this.data[i];
      const initialLength = Math.min(Math.max(lengthScale(datum.yearpublished), 40), 65);
      const maxDepth = depthScale(datum.weight_average);
      const branchAngle = branchAngleScale(datum.number_of_ratings);
      const lengthFactor = lengthFactorScale(datum.rating_average);
      const ratioBranchAngle = ratioBranchAngleScale(datum.categoryScore);
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
