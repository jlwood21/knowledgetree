/** @jsx h */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-green-200 p-4">
      <Head>
        <title>Knowledge Tree</title>
      </Head>
      <h1 class="text-4xl font-bold mb-6">Welcome to Knowledge Tree 🌳</h1>
      <p class="text-lg mb-8 text-gray-700">
        Build and visualize your knowledge in a beautifully organized way.
      </p>
      <a href="/knowledge-tree">
        <button class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
          Start Building Your Knowledge Tree
        </button>
      </a>
    </div>
  );
}
