// components/TreeVisualization.tsx

import { h } from "preact";
import { useState } from "preact/hooks";
import Trunk from "./Trunk.tsx";
import Branch from "./Branch.tsx";
import Leaf from "./Leaf.tsx";

export default function TreeVisualization() {
  const [trunkTitle, setTrunkTitle] = useState<string>("Main Knowledge Tree");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchCounter, setBranchCounter] = useState(1);
  const [leafCounter, setLeafCounter] = useState(1);
  const [newBranchTitle, setNewBranchTitle] = useState<string>("");
  const [newLeafTitle, setNewLeafTitle] = useState<string>("");
  const [selectedParentBranch, setSelectedParentBranch] = useState<number | null>(null);
  const [selectedLeafParentBranch, setSelectedLeafParentBranch] = useState<number | null>(null);

  // Function to calculate new branch position with dynamic spacing
  const calculateBranchPosition = (parentBranch, siblingCount) => {
    const distanceFromParent = 100; // Adjust this to control spacing
    const angle = (siblingCount * 30) - 45; // Spread out branches, change 30 to adjust angle increment
    const angleInRadians = (angle * Math.PI) / 180;

    return {
      x: parentBranch ? parentBranch.x + distanceFromParent * Math.cos(angleInRadians) : 400,
      y: parentBranch ? parentBranch.y - distanceFromParent * Math.sin(angleInRadians) : 300,
    };
  };

  const addBranch = () => {
    const parentBranch = branches.find((branch) => branch.id === selectedParentBranch);
    const siblingBranches = branches.filter((branch) => branch.parentBranchId === selectedParentBranch);
    
    const { x, y } = calculateBranchPosition(parentBranch, siblingBranches.length);

    setBranches((prevBranches) => [
      ...prevBranches,
      {
        id: branchCounter,
        title: newBranchTitle || `Branch ${branchCounter}`,
        leaves: [],
        parentBranchId: selectedParentBranch || undefined,
        x,
        y,
      },
    ]);
    setBranchCounter((prevCount) => prevCount + 1);
    setNewBranchTitle(""); // Reset title input
  };

  const addLeaf = () => {
    if (!selectedLeafParentBranch) return;

    setBranches((prevBranches) =>
      prevBranches.map((branch) =>
        branch.id === selectedLeafParentBranch
          ? {
              ...branch,
              leaves: [
                ...branch.leaves,
                {
                  id: leafCounter,
                  title: newLeafTitle || `Leaf ${leafCounter}`,
                  notes: "Notes for leaf",
                },
              ],
            }
          : branch
      )
    );
    setLeafCounter((prevCount) => prevCount + 1);
    setNewLeafTitle(""); // Reset title input
  };

  return (
    <div class="tree-visualization">
      <h2 class="text-2xl font-bold mb-4">Knowledge Tree Builder 🌲</h2>

      {/* Input for setting trunk title */}
      <div class="flex items-center mb-4">
        <input
          class="border rounded px-2 py-1 mr-2"
          type="text"
          placeholder="Enter Trunk Title"
          value={trunkTitle}
          onChange={(e) => setTrunkTitle((e.target as HTMLInputElement).value)}
        />
      </div>

      <div class="flex items-center mb-4">
        <input
          class="border rounded px-2 py-1 mr-2"
          type="text"
          placeholder="Enter Branch Title"
          value={newBranchTitle}
          onChange={(e) => setNewBranchTitle((e.target as HTMLInputElement).value)}
        />

        {/* Dropdown to select the parent branch */}
        <select
          class="border rounded px-2 py-1 mr-2"
          onChange={(e) =>
            setSelectedParentBranch(Number((e.target as HTMLSelectElement).value))
          }
          value={selectedParentBranch ?? ""}
        >
          <option value="">Select Parent (Trunk)</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.title}
            </option>
          ))}
        </select>

        <button class="px-4 py-2 bg-blue-600 text-white rounded" onClick={addBranch}>
          Add Branch
        </button>
      </div>

      {/* Input and dropdown for adding leaves */}
      <div class="flex items-center mb-4">
        <input
          class="border rounded px-2 py-1 mr-2"
          type="text"
          placeholder="Enter Leaf Title"
          value={newLeafTitle}
          onChange={(e) => setNewLeafTitle((e.target as HTMLInputElement).value)}
        />

        {/* Dropdown to select the parent branch for the leaf */}
        <select
          class="border rounded px-2 py-1 mr-2"
          onChange={(e) =>
            setSelectedLeafParentBranch(Number((e.target as HTMLSelectElement).value))
          }
          value={selectedLeafParentBranch ?? ""}
        >
          <option value="">Select Branch for Leaf</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.title}
            </option>
          ))}
        </select>

        <button class="px-4 py-2 bg-green-500 text-white rounded" onClick={addLeaf}>
          Add Leaf
        </button>
      </div>

      <svg width="800" height="600" class="tree-svg">
        {/* Draw the trunk with the title */}
        <Trunk title={trunkTitle} />

        {/* Draw branches */}
        {branches.map((branch) => (
          <Branch
            key={branch.id}
            x={branch.x}
            y={branch.y}
            title={branch.title}
            leaves={branch.leaves}
          />
        ))}
      </svg>
    </div>
  );
}
