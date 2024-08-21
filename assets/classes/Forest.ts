import * as d3 from 'd3';
import Tree from './Tree';
import type { GameData, D3SvgSelection } from '~/types';

class Forest {
  data: GameData[];
  trees: Tree[] = [];
  svg: D3SvgSelection;
  minYear: number;
  maxYear: number;
  minOwnedNumber: number;
  maxOwnedNumber: number;

  constructor(data: GameData[], svg: D3SvgSelection) {
    this.data = data;
    this.svg = svg;

    this.minYear = 1990 || Math.min(...data.map((datum) => datum.yearpublished));
    this.maxYear = Math.max(...data.map((datum) => datum.yearpublished));
    this.minOwnedNumber = Math.min(...data.map((datum) => datum.owned_number));
    this.maxOwnedNumber = Math.max(...data.map((datum) => datum.owned_number));

    // const categories = data
    //   .map((datum) => datum.categories)
    //   .flat()
    //   .reduce(
    //     (acc, category) => {
    //       if (!acc[category]) acc[category] = 0;
    //       acc[category]++;
    //       return acc;
    //     },
    //     {} as { [key: string]: number },
    //   );
    // console.log(categories);

    this.init();
  }

  init() {
    const lengthScale = d3.scaleLinear().domain([this.minYear, this.maxYear]).range([60, 35]);
    const depthScale = d3.scaleLinear().domain([1, 4.5]).range([4, 9]);
    const branchAngleScale = d3
      .scaleLinear()
      .domain([this.minOwnedNumber, this.maxOwnedNumber])
      .range([Math.PI / 12, Math.PI / 4]);

    for (let i = 0; i < this.data.length; i++) {
      const datum = this.data[i];
      const initialLength = Math.min(Math.max(lengthScale(datum.yearpublished), 35), 60);
      const maxDepth = depthScale(datum.weight_average);
      const branchAngle = branchAngleScale(datum.number_of_ratings);

      const t = new Tree(i, datum, initialLength, maxDepth, branchAngle);

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
