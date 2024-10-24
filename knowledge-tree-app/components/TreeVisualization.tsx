// components/TreeVisualization.tsx

import { h } from "preact";
import { useState } from "preact/hooks";

interface Node {
  id: number;
  label: string;
  notes: string;
  media?: string[];
}

export default function TreeVisualization() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [nodeCounter, setNodeCounter] = useState(1);

  const addNode = () => {
    setNodes((prevNodes) => [
      ...prevNodes,
      { id: nodeCounter, label: `Node ${nodeCounter}`, notes: "Notes for node", media: [] },
    ]);
    setNodeCounter((prevCount) => prevCount + 1);
  };

  return (
    <div class="tree-visualization">
      <p class="text-xl mb-4">Tree Visualization 🌳</p>
      <button class="px-4 py-2 bg-green-600 text-white rounded" onClick={addNode}>
        Add Leaf
      </button>
      <div class="tree">
        {nodes.map((node) => (
          <div key={node.id} class="leaf">
            <div class="leaf-icon">🍃</div>
            <p>{node.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
