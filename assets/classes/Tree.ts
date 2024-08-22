import * as d3 from 'd3';
import { createNoise2D } from 'simplex-noise';
import type { GameData, D3SvgSelection } from '~/types';

function adjustColor(color: string) {
  const hcl = d3.hcl(color);
  hcl.c += (Math.random() + 0.5) * 10; // Adjust chroma
  hcl.l += (Math.random() + 0.5) * 10; // Adjust lightness
  hcl.opacity = 0.029;
  return hcl.toString();
}

function wrapText(text, maxWidth) {
  text.each(function () {
    const text = d3.select(this);
    const words = text.text().split(/\s+/).reverse();
    let word;
    let line = [];
    let lineNumber = 0;
    const lineHeight = 1.1; // ems
    const y = text.attr('y');
    const dy = parseFloat(text.attr('dy')) || 0;
    let tspan = text
      .text(null)
      .append('tspan')
      .attr('x', 0)
      .attr('y', y)
      .attr('dy', dy + 'em');

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(' '));
      if (tspan.node().getComputedTextLength() > maxWidth) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text
          .append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy + 'em')
          .text(word);
      }
    }

    // Calculate the maximum width of the text block
    const textWidth = Math.max(
      ...text
        .selectAll('tspan')
        .nodes()
        .map((tspan) => tspan.getComputedTextLength()),
    );

    // Center each line by adjusting the x attribute of each tspan
    text.selectAll('tspan').each(function () {
      const tspan = d3.select(this);
      const tspanWidth = tspan.node().getComputedTextLength();
      tspan.attr('x', (textWidth - tspanWidth) / 2);
    });
  });
}

class Tree {
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

  constructor(index: number, gameData: GameData, initialLength = 50, maxDepth = 7, branchAngle = Math.PI / 7, ratioBranchAngle = 5, lengthFactor = 0.8, leafSize = 15, colors: string[]) {
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
    this.group = svg.append('g').attr('transform', `translate(${(this.index % 5) * 400 + 175},${Math.floor(this.index / 5) * 400 + 300})`);
  }

  draw(length = this.initialLength, angle = Math.PI / 2, x1 = 0, y1 = 0, depth = this.maxDepth) {
    if (depth <= 0) return;

    const x2 = x1 + length * Math.cos(angle);
    const y2 = y1 - length * Math.sin(angle);

    const color = adjustColor(this.colors[Math.floor(Math.random() * this.colors.length)]);

    // <path d="M10 20 Q 15 10 20 20 T 30 20" />
    // <path d="M10 30 Q 15 10 20 30 T 30 30" />
    // <path d="M10 30 Q 15 0 20 30 Z" />
    // <path d="M10 30 Q 15 0 20 30 Q 15 40 10 30 Z" />

    // this.group
    //   .append('path')
    //   .attr('d', 'M10 30 Q 15 0 20 30 Q 15 40 10 30 Z')
    //   .attr('transform', `translate(${x1 - 20},${y1 - 30}) scale(1.25)`)
    //   .attr('stroke', 'none')
    //   .attr('fill', color)
    //   .attr('class', 'leaf');

    this.group.append('circle').attr('cx', x1).attr('cy', y1).attr('r', this.leafSize).attr('fill', color).attr('stroke', 'none');
    // this.group
    //   .append('rect')
    //   .attr('x', x1 - 10)
    //   .attr('y', y1 - 10)
    //   .attr('width', 20)
    //   .attr('height', 20)
    //   .attr('fill', color)
    //   .attr('stroke', 'none');

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
      // Create a group element to wrap the text
      const textGroup = this.group.append('g').attr('transform', `translate(${x1}, ${y1})`);

      // Append text label at the base of the tree
      const text = textGroup
        .append('text')
        .attr('x', x1)
        .attr('y', y1 + 15)
        .attr('class', 'label')
        .attr('stroke-width', 1)
        .text(() => this.gameData.name)
        .call(wrapText, 300); // Adjust the width as needed
      // .tspans(function (d) {
      //   return d3.wordwrap(text, 15); // break line after 15 characters
      // });

      // this.group
      //   .append('text')
      //   .attr('x', x1 - 15)
      //   .attr('y', y1 + 45)
      //   .attr('class', 'label')
      //   .attr('stroke-width', 1)
      //   .text(() => this.gameData.rating_average);

      // Center the entire text block
      const bbox = text.node().getBBox();
      textGroup.attr('transform', `translate(${x1 - bbox.width / 2}, ${y1 + 30})`);
    }

    const randomBranchAngle = this.branchAngle * (this.ratioBranchAngle / 4.75) + (this.noise(x1, y1) * Math.PI) / 9;
    // const randomBranchAngle = this.branchAngle * (this.ratioBranchAngle / 50) + this.noise(x1, y1);

    this.draw(length * this.lengthFactor, angle - randomBranchAngle, x2, y2, depth - 1);
    this.draw(length * this.lengthFactor, angle + randomBranchAngle, x2, y2, depth - 1);
  }
}

export default Tree;
