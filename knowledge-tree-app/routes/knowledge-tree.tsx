import { Head } from "$fresh/runtime.ts";

export default function KnowledgeTree() {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>Knowledge Tree Builder</title>
      </Head>
      <h1 class="text-3xl font-bold mb-4">Knowledge Tree Builder 🌲</h1>
      <p class="mb-6 text-lg text-gray-700">
        Select a template and start adding nodes to visualize your knowledge!
      </p>
      {/* This is where we will add template selection and the main visualization component */}
    </div>
  );
}
