// components/TreeVisualization.tsx

import { h } from "preact";
import { useState } from "preact/hooks";

interface Leaf {
  id: number;
  title: string;
  notes: string;
}

interface Branch {
  id: number;
  title: string;
  leaves: Leaf[];
  parentBranchId?: number; // Reference to the parent branch, if any
  x: number; // X coordinate for the branch
  y: number; // Y coordinate for the branch
  angle: number; // Angle to spread out branches from the same parent
}

export default function TreeVisualization() {
  const [trunkTitle, setTrunkTitle] = useState<string>("Main Knowledge Tree");
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchCounter, setBranchCounter] = useState(1);
  const [leafCounter, setLeafCounter] = useState(1);
  const [newBranchTitle, setNewBranchTitle] = useState<string>("");
  const [newLeafTitle, setNewLeafTitle] = useState<string>("");
  const [selectedParentBranch, setSelectedParentBranch] = useState<number | null>(null);
  const [selectedLeafParentBranch, setSelectedLeafParentBranch] = useState<number | null>(null);

  const addBranch = () => {
    // Find sibling branches connected to the selected parent (trunk or another branch)
    const siblingBranches = branches.filter(
      (branch) => branch.parentBranchId === selectedParentBranch
    );

    // Define the angle increment based on the number of sibling branches
    const angleIncrement = 15; // Angle increment in degrees for each sibling branch

    // Define the angle based on the number of siblings
    const branchAngle = siblingBranches.length * angleIncrement - (siblingBranches.length * angleIncrement) / 2;

    // Calculate new branch's position dynamically based on its parent and the angle
    const parentBranch = branches.find((branch) => branch.id === selectedParentBranch);
    const baseX = parentBranch ? parentBranch.x : 400;
    const baseY = parentBranch ? parentBranch.y : 300;
    const distanceFromParent = 100; // Distance between the parent and the branch

    // Calculate new branch coordinates using trigonometry to spread them
    const branchX = baseX + distanceFromParent * Math.cos((branchAngle * Math.PI) / 180);
    const branchY = baseY - distanceFromParent * Math.sin((branchAngle * Math.PI) / 180);

    setBranches((prevBranches) => [
      ...prevBranches,
      {
        id: branchCounter,
        title: newBranchTitle || `Branch ${branchCounter}`,
        leaves: [],
        parentBranchId: selectedParentBranch || undefined,
        x: branchX,
        y: branchY,
        angle: branchAngle,
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
        <rect x="390" y="300" width="20" height="150" fill="#8B4513" />
        <text x="380" y="290" fontSize="16" fill="#8B4513">
          {trunkTitle}
        </text>

        {/* Draw branches */}
        {branches.map((branch, index) => (
          <g key={branch.id} transform={`translate(${branch.x}, ${branch.y})`}>
            {/* Draw the branch */}
            <line x1="0" y1="0" x2="40" y2="-40" stroke="green" strokeWidth="4" />
            <text x="50" y="-45" fontSize="12" fill="green">
              {branch.title}
            </text>

            {/* Draw leaves on each branch */}
            {branch.leaves.map((leaf, leafIndex) => (
              <g key={leaf.id} transform={`translate(${leafIndex * 30}, -50)`}>
                <circle cx="10" cy="-10" r="5" fill="green" />
                <text x="15" y="-5" fontSize="10" fill="green">
                  {leaf.title}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
