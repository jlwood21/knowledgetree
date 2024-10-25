// Trunk.tsx
import { h } from "preact";

export default function Trunk({ title }) {
  return (
    <g>
      <rect x="390" y="300" width="20" height="150" fill="#8B4513" />
      <text x="380" y="290" fontSize="16" fill="#8B4513">{title}</text>
    </g>
  );
}
