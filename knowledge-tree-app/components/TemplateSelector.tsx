import { h } from "preact";

interface TemplateSelectorProps {
  onSelect: (template: string) => void;
}

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div class="flex gap-4 mt-8">
      <button
        onClick={() => onSelect("Tree")}
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        Tree 🌳
      </button>
      <button
        onClick={() => onSelect("House")}
        class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
      >
        House 🏠
      </button>
      <button
        onClick={() => onSelect("Pyramid")}
        class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700"
      >
        Pyramid 🔺
      </button>
    </div>
  );
}
