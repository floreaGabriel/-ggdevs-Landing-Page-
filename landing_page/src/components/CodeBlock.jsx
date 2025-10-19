export default function CodeBlock({ code }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-6 bg-neutral-900 border border-neutral-800 rounded-md shadow-md overflow-auto">
      <pre className="p-5 text-green-300 text-sm md:text-base font-mono whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

