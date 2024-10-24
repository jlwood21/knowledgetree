import { Head } from "$fresh/runtime.ts";
import TemplateSelector from "../components/TemplateSelector.tsx";
import { useState } from "preact/hooks";

export default function KnowledgeTree() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>Knowledge Tree Builder</title>
      </Head>
      <h1 class="text-3xl font-bold mb-4">Knowledge Tree Builder 🌲</h1>
      <p class="mb-6 text-lg text-gray-700">
        Select a template and start adding nodes to visualize your knowledge!
      </p>
      {!selectedTemplate ? (
        <TemplateSelector onSelect={setSelectedTemplate} />
      ) : (
        <div>
          <h2 class="text-2xl font-bold mb-4">Selected Template: {selectedTemplate}</h2>
          <p>Now we can start building your {selectedTemplate}!</p>
          {/* Placeholder for where the actual builder will be */}
        </div>
      )}
    </div>
  );
}
