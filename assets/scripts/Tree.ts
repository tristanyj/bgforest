/* eslint-disable import/namespace */
import * as d3 from 'd3';
import { createNoise2D } from 'simplex-noise';
import type { GameData, D3SvgSelection } from '~/types';

import { useInteractionStore } from '~/stores/interaction';

function adjustColor(color: string) {
  const hcl = d3.hcl(color);
  hcl.c += (Math.random() + 0.5) * 10; // Adjust chroma
  hcl.l += (Math.random() + 0.5) * 10; // Adjust lightness
  hcl.opacity = 0.029;
  return hcl.toString();
}

function wrapText(text: d3.Selection<SVGElement, any, any, any>, maxWidth: number) {
  text.each(function () {
    const text = d3.select(this);
    const words = text.text().split(/\s+/).reverse();
    let word;
    let line: string[] = [];
    let lineNumber = 0;
    const lineHeight = 1.1; // ems
    const y = text.attr('y');
    const dy = parseFloat(text.attr('dy')) || 0;
    let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', `${dy}em`);

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(' '));
      const computedTextLength = tspan.node()?.getComputedTextLength() || 0;
      if (computedTextLength && computedTextLength > maxWidth) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text
          .append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', `${++lineNumber * lineHeight + dy}em`)
          .text(word);
      }
    }

    // Calculate the maximum width of the text block
    const textWidth = Math.max(
      ...text
        .selectAll('tspan')
        .nodes()
        .map((tspan) => (tspan ? (tspan as SVGTextElement).getComputedTextLength() : 0)),
    );

    // Center each line by adjusting the x attribute of each tspan
    text.selectAll('tspan').each(function () {
      const tspan = d3.select(this);
      const tspanWidth = (tspan.node() as SVGTextElement)?.getComputedTextLength() || 0;
      tspan.attr('x', (textWidth - tspanWidth) / 2);
    });
  });
}

class Tree {
  store: ReturnType<typeof useInteractionStore>;
  group: any;
  index: number;
  gameData: GameData;
  maxDepth: number;
  branchAngle: number;
  ratioBranchAngle: number;
  initialLength: number;
  lengthFactor: number;
  leafSize: number;
  colors: string[];
  noise: any;

  constructor(store: ReturnType<typeof useInteractionStore>, index: number, gameData: GameData, initialLength = 50, maxDepth = 7, branchAngle = Math.PI / 7, ratioBranchAngle = 5, lengthFactor = 0.8, leafSize = 15, colors: string[]) {
    this.store = store;
    this.index = index;
    this.gameData = gameData;
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
    this.group.append('circle').attr('class', 'tree-background').attr('cx', 0).attr('cy', 0).attr('r', 125).attr('fill', '#000');
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
        this.store.setSelectedGame(this.gameData);
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

    const color = adjustColor(this.colors[Math.floor(Math.random() * this.colors.length)]);

    this.group.append('circle').attr('cx', x1).attr('cy', y1).attr('r', this.leafSize).attr('fill', color).attr('stroke', 'none');

    const lineColor = d3.color('#4b1818');
    if (lineColor) {
      const scale = d3.scaleLinear().domain([-1, 1]).range([0.1, 0.9]);
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
        .text(() => this.gameData.name)
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
