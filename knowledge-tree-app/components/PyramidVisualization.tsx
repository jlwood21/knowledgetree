// components/PyramidVisualization.tsx

import { h } from "preact";
import { useState } from "preact/hooks";

interface Block {
  id: number;
  label: string;
  notes: string;
  media?: string[];
}

export default function PyramidVisualization() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [blockCounter, setBlockCounter] = useState(1);

  const addBlock = () => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: blockCounter, label: `Block ${blockCounter}`, notes: "Notes for block", media: [] },
    ]);
    setBlockCounter((prevCount) => prevCount + 1);
  };

  return (
    <div class="pyramid-visualization">
      <p class="text-xl mb-4">Pyramid Visualization 🔺</p>
      <button class="px-4 py-2 bg-orange-600 text-white rounded" onClick={addBlock}>
        Add Block
      </button>
      <div class="pyramid">
        {blocks.map((block) => (
          <div key={block.id} class="block">
            <div class="block-icon">🧱</div>
            <p>{block.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
