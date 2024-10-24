import { Head } from "$fresh/runtime.ts";
import KnowledgeTree from "../islands/knowledge-tree.tsx";

export default function KnowledgeTreePage() {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>Knowledge Tree Builder</title>
      </Head>
      <KnowledgeTree />
    </div>
  );
}
