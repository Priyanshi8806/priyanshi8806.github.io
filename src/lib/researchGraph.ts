// Builds the research map (questions ↔ projects ↔ methods) and lays it out at build time
// with d3-force, so the page ships a static SVG and only a little JS for hover highlighting.
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from 'd3-force';
import { getProjects, getAgenda } from './content';
import { url } from './url';

export type NodeType = 'question' | 'project' | 'method';
export interface GraphNode extends SimulationNodeDatum {
  id: string;
  type: NodeType;
  label: string;
  href?: string;
}
export interface GraphLink {
  source: string;
  target: string;
}

// Label geometry shared with ResearchMap.astro: where each node type puts its label.
export const labelDy: Record<NodeType, number> = { project: -16, question: 36, method: 20 };
const layerY: Record<NodeType, number> = { project: 0.16, question: 0.5, method: 0.84 };

export async function buildGraph() {
  const [agenda, projects] = await Promise.all([getAgenda(), getProjects()]);
  const nodes = new Map<string, GraphNode>();
  const links: GraphLink[] = [];
  const method = (m: string) => {
    const id = `m:${m}`;
    if (!nodes.has(id)) nodes.set(id, { id, type: 'method', label: m });
    return id;
  };

  for (const q of agenda) {
    const id = `q:${q.id}`;
    nodes.set(id, { id, type: 'question', label: q.data.short, href: url(`/agenda/#${q.id}`) });
    for (const m of q.data.methods) links.push({ source: id, target: method(m) });
  }
  for (const p of projects) {
    const id = `p:${p.id}`;
    const label = p.data.short ?? (p.data.title.length > 24 ? p.data.title.slice(0, 22).replace(/\s+\S*$/, '') + '…' : p.data.title);
    nodes.set(id, { id, type: 'project', label, href: url(`/research/${p.id}/`) });
    for (const q of p.data.questions) links.push({ source: id, target: `q:${q.id}` });
    for (const m of p.data.methods) links.push({ source: id, target: method(m) });
  }
  return { nodes: [...nodes.values()], links };
}

// Rectangle collision on each node's label box, so labels never overlap.
function forceLabelBoxes(boxes: Map<string, { w: number; h: number; dy: number }>) {
  let nodes: GraphNode[] = [];
  const force = (alpha: number) => {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const A = boxes.get(a.id)!, B = boxes.get(b.id)!;
        const dx = b.x! - a.x!;
        const dy = b.y! + B.dy - (a.y! + A.dy);
        const ox = (A.w + B.w) / 2 - Math.abs(dx);
        const oy = (A.h + B.h) / 2 - Math.abs(dy);
        if (ox <= 0 || oy <= 0) continue;
        const k = 0.5 * Math.min(1, alpha * 4);
        if (ox < oy * 4) {
          const s = (dx < 0 ? -1 : 1) * ox * k;
          a.x! -= s;
          b.x! += s;
        } else {
          const s = (dy < 0 ? -1 : 1) * oy * k;
          a.y! -= s;
          b.y! += s;
        }
      }
    }
  };
  force.initialize = (n: GraphNode[]) => (nodes = n);
  return force;
}

export function layout(graph: { nodes: GraphNode[]; links: GraphLink[] }, width: number, height: number, font: number) {
  const nodes = graph.nodes.map((n, i) => ({
    ...n,
    // Deterministic start: spread each layer across the width.
    x: width * (0.15 + 0.7 * ((i * 0.618) % 1)),
    y: height * layerY[n.type],
  }));
  const links = graph.links.map((l) => ({ ...l }));
  const charW = { question: font * 1.3 * 0.58, project: font * 0.62, method: font * 0.92 * 0.62 };
  const boxes = new Map(
    nodes.map((n) => [
      n.id,
      {
        w: Math.max(30, n.label.length * charW[n.type]) + 28,
        h: n.type === 'question' ? 70 : 44,
        dy: n.type === 'project' ? -6 : n.type === 'question' ? 14 : 8,
      },
    ]),
  );

  forceSimulation(nodes)
    .force('link', forceLink<GraphNode, any>(links).id((d) => d.id).strength(0.08))
    .force('charge', forceManyBody().strength(-220))
    .force('x', forceX(width / 2).strength(0.01))
    .force('y', forceY<GraphNode>((d) => height * layerY[d.type]).strength(0.35))
    .force('boxes', forceLabelBoxes(boxes) as any)
    .stop()
    .tick(500);

  // Crop the viewBox to the content (labels included) instead of squeezing the layout.
  const pad = 12;
  const minX = Math.min(...nodes.map((n) => n.x - boxes.get(n.id)!.w / 2)) - pad;
  const maxX = Math.max(...nodes.map((n) => n.x + boxes.get(n.id)!.w / 2)) + pad;
  const minY = Math.min(...nodes.map((n) => n.y + labelDy[n.type] - 18)) - pad;
  const maxY = Math.max(...nodes.map((n) => n.y + labelDy[n.type] + 10)) + pad;
  // Never narrower than the nominal width, so text keeps its intended size.
  const vbW = Math.max(width, maxX - minX);
  const vbX = (minX + maxX) / 2 - vbW / 2;
  const viewBox = [vbX, minY, vbW, maxY - minY].map((v) => v.toFixed(0)).join(' ');

  const byId = new Map(nodes.map((n) => [n.id, n]));
  return {
    viewBox,
    nodes,
    links: graph.links.map((l) => ({ ...l, a: byId.get(l.source)!, b: byId.get(l.target)! })),
  };
}
