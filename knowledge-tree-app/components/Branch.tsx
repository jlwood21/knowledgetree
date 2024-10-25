// Branch.tsx
import { h } from "preact";
import Leaf from "./Leaf.tsx";

export default function Branch({ x, y, title, leaves }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="0" x2="40" y2="-40" stroke="green" strokeWidth="4">
        <animate attributeName="x2" from="0" to="40" dur="0.5s" fill="freeze" />
      </line>
      <text x="50" y="-45" fontSize="12" fill="green">{title}</text>
      {leaves.map((leaf, index) => (
        <Leaf key={leaf.id} title={leaf.title} index={index} />
      ))}
    </g>
  );
}
