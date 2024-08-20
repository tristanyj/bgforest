import type { GameData } from '~/types';

class Tree {
  group: any;
  index: number;
  gameData: GameData;
  maxDepth: number;
  branchAngle: number;
  lengthFactor: number;

  constructor(index: number, gameData: GameData, maxDepth = 8, branchAngle = Math.PI / 6, lengthFactor = 0.6) {
    this.index = index;
    this.gameData = gameData;
    this.maxDepth = maxDepth;
    this.branchAngle = branchAngle;
    this.lengthFactor = lengthFactor;
  }

  init(svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>) {
    this.group = svg
      .append('g')
      .attr('transform', `translate(${(this.index % 10) * 150 + 75},${Math.floor(this.index / 10) * 150 + 150})`)
      .attr('class', 'tree');
  }

  draw(x1: number, y1: number, length: number, angle: number, depth: number) {
    if (depth === 0) return;

    const x2 = x1 + length * Math.cos(angle);
    const y2 = y1 - length * Math.sin(angle);

    this.group
      .append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke-width', Math.max(1, depth / 2));

    this.draw(x2, y2, length * this.lengthFactor, angle - this.branchAngle, depth - 1);
    this.draw(x2, y2, length * this.lengthFactor, angle + this.branchAngle, depth - 1);
  }
}

export default Tree;
