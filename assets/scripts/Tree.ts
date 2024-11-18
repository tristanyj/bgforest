import { scaleLinear } from 'd3';
import { color } from 'd3-color';
import { createNoise2D } from 'simplex-noise';
import type { Game, D3SvgSelection } from '~/types';
import { adjustColor, wrapText } from '~/assets/scripts/utils';

import { useInteractionStore } from '~/stores/interaction';

class Tree {
  store: ReturnType<typeof useInteractionStore>;
  group: any;
  index: number;
  game: Game;
  maxDepth: number;
  branchAngle: number;
  ratioBranchAngle: number;
  initialLength: number;
  lengthFactor: number;
  leafSize: number;
  colors: string[];
  noise: any;

  constructor(store: ReturnType<typeof useInteractionStore>, index: number, game: Game, initialLength: number, maxDepth: number, branchAngle: number, ratioBranchAngle: number, lengthFactor: number, leafSize: number, colors: string[]) {
    this.store = store;
    this.index = index;
    this.game = game;
    this.maxDepth = maxDepth;
    this.branchAngle = branchAngle;
    this.ratioBranchAngle = ratioBranchAngle;
    this.initialLength = initialLength;
    this.lengthFactor = lengthFactor;
    this.leafSize = leafSize;
    this.colors = colors;
    this.noise = createNoise2D();
  }

  init(svg: D3SvgSelection) {
    this.group = svg.append('g').attr('transform', `translate(${(this.index % 5) * 400 + 200},${Math.floor(this.index / 5) * 400 + 300})`);
    this.group.append('circle').attr('class', 'tree-background').attr('cx', 0).attr('cy', 0).attr('r', 100).attr('fill', '#000');
  }

  interaction() {
    this.group
      .append('rect')
      .attr('class', 'tree-background-hover')
      .attr('x', -200)
      .attr('y', -260)
      .attr('width', 400)
      .attr('height', 400)
      .attr('fill', 'transparent')
      .on('mouseenter', () => {
        const bg = this.group.select('.tree-background');
        bg.classed('hovered', true);
      })
      .on('click', () => {
        this.store.setSelectedGame(this.game);
      })
      .on('mouseleave', () => {
        const bg = this.group.select('.tree-background');
        bg.classed('hovered', false);
      });
  }

  draw(length = this.initialLength, angle = Math.PI / 2, x1 = 0, y1 = 0, depth = this.maxDepth) {
    if (depth <= 0) return;

    const x2 = x1 + length * Math.cos(angle);
    const y2 = y1 - length * Math.sin(angle);

    const randomColor = adjustColor(this.colors[Math.floor(Math.random() * this.colors.length)]);

    this.group.append('circle').attr('cx', x1).attr('cy', y1).attr('r', this.leafSize).attr('fill', randomColor).attr('stroke', 'none');

    const lineColor = color('#4b1818');
    if (lineColor) {
      const scale = scaleLinear().domain([-1, 1]).range([0.1, 0.9]);
      lineColor.opacity = scale(this.noise(x1, y1 * 100));
    }

    this.group
      .append('line')
      .attr('x1', x1)
      .attr('y1', y1)
      .attr('x2', x2)
      .attr('y2', y2)
      .attr('stroke-width', Math.max(1, depth / 2))
      .attr('stroke', lineColor);

    if (x1 === 0) {
      const textGroup = this.group.append('g').attr('transform', `translate(${x1}, ${y1})`);

      const text = textGroup
        .append('text')
        .attr('x', x1)
        .attr('y', y1 + 15)
        .attr('class', 'label')
        .attr('stroke-width', 1)
        .text(() => this.game.name)
        .call(wrapText, 300);

      const bbox = text.node().getBBox();
      textGroup.attr('transform', `translate(${x1 - bbox.width / 2}, ${y1 + 30})`);
    }

    const randomBranchAngle = this.branchAngle * (this.ratioBranchAngle / 4.75) + (this.noise(x1, y1) * Math.PI) / 9;

    this.draw(length * this.lengthFactor, angle - randomBranchAngle, x2, y2, depth - 1);
    this.draw(length * this.lengthFactor, angle + randomBranchAngle, x2, y2, depth - 1);
  }
}

export default Tree;
