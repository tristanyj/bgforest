import { hcl } from 'd3-color';
import { select } from 'd3-selection';

export function adjustColor(color: string) {
  const h = hcl(color);
  h.c += (Math.random() + 0.5) * 10;
  h.l += (Math.random() + 0.5) * 10;
  h.opacity = 0.029;
  return h.toString();
}

export function wrapText(text: d3.Selection<SVGElement, any, any, any>, maxWidth: number) {
  text.each(function () {
    const text = select(this);
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
      const tspan = select(this);
      const tspanWidth = (tspan.node() as SVGTextElement)?.getComputedTextLength() || 0;
      tspan.attr('x', (textWidth - tspanWidth) / 2);
    });
  });
}
