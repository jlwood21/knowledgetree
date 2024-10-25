// Leaf.tsx
import { h } from "preact";

export default function Leaf({ title, index }) {
  return (
    <g transform={`translate(${index * 30}, -50)`}>
      <circle cx="10" cy="-10" r="5" fill="green" />
      <text x="15" y="-5" fontSize="10" fill="green">{title}</text>
    </g>
  );
}
