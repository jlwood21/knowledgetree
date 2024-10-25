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
  parentBranchId?: number | null;
  x: number;
  y: number;
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

  function calculateBranchPosition(parentBranch, siblingIndex, totalSiblings) {
    const baseDistance = 100;
    const angleRange = 180; // Spread branches over 180 degrees
    const startAngle = -90; // Start angle pointing upwards
    const angleIncrement = totalSiblings > 1 ? angleRange / (totalSiblings - 1) : 0;
    const angle = startAngle + siblingIndex * angleIncrement;
    const radians = (Math.PI / 180) * angle;
    const x = parentBranch
      ? parentBranch.x + baseDistance * Math.cos(radians)
      : 400 + baseDistance * Math.cos(radians);
    const y = parentBranch
      ? parentBranch.y + baseDistance * Math.sin(radians)
      : 550 + baseDistance * Math.sin(radians); // Adjusted trunk base y position
    return { x, y };
  }

  const addBranch = () => {
    const parentBranch = branches.find((branch) => branch.id === selectedParentBranch);
    const siblingBranches = branches.filter(
      (branch) => branch.parentBranchId === selectedParentBranch
    );
    const siblingIndex = siblingBranches.length;
    const totalSiblings = siblingBranches.length + 1;
    const { x, y } = calculateBranchPosition(parentBranch, siblingIndex, totalSiblings);

    setBranches((prevBranches) => [
      ...prevBranches,
      {
        id: branchCounter,
        title: newBranchTitle || `Branch ${branchCounter}`,
        leaves: [],
        parentBranchId: selectedParentBranch || null,
        x: x,
        y: y,
      },
    ]);
    setBranchCounter((prevCount) => prevCount + 1);
    setNewBranchTitle("");
  };

  const addLeaf = () => {
    if (selectedLeafParentBranch === null) return;

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
    setNewLeafTitle("");
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
            setSelectedParentBranch(
              e.target.value === "" ? null : Number((e.target as HTMLSelectElement).value)
            )
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
            setSelectedLeafParentBranch(
              e.target.value === "" ? null : Number((e.target as HTMLSelectElement).value)
            )
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
        <rect x="390" y="550" width="20" height="100" fill="#8B4513" />
        <text x="400" y="540" textAnchor="middle" fontSize="16" fill="#8B4513">
          {trunkTitle}
        </text>

        {/* Draw branches */}
        {branches.map((branch) => {
          const parentBranch = branches.find((b) => b.id === branch.parentBranchId);
          const x1 = parentBranch ? parentBranch.x : 400;
          const y1 = parentBranch ? parentBranch.y : 550;
          const x2 = branch.x;
          const y2 = branch.y;

          return (
            <g key={branch.id}>
              {/* Draw the line from parent to current branch */}
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="green" strokeWidth="4" />

              {/* Draw the branch node */}
              <circle cx={x2} cy={y2} r="10" fill="green" />
              <text x={x2} y={y2 - 15} textAnchor="middle" fontSize="12" fill="green">
                {branch.title}
              </text>

              {/* Draw leaves */}
              {branch.leaves.map((leaf, leafIndex) => {
                const leafSpacing = 20; // Adjust as needed
                const totalLeaves = branch.leaves.length;
                const startX = x2 - ((totalLeaves - 1) * leafSpacing) / 2;
                const xLeaf = startX + leafIndex * leafSpacing;
                const yLeaf = y2 - 50; // Adjust as needed

                return (
                  <g key={leaf.id}>
                    <line
                      x1={x2}
                      y1={y2}
                      x2={xLeaf}
                      y2={yLeaf}
                      stroke="green"
                      strokeWidth="2"
                    />
                    <circle
                      cx={xLeaf}
                      cy={yLeaf}
                      r="5"
                      fill="green"
                      onClick={() => alert(`Opening notes for ${leaf.title}`)}
                      style={{ cursor: "pointer" }}
                    />
                    <text
                      x={xLeaf}
                      y={yLeaf - 10}
                      textAnchor="middle"
                      fontSize="10"
                      fill="green"
                    >
                      {leaf.title}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
