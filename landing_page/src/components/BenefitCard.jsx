export default function BenefitCard({ title, children }) {
  return (
    <div className="max-w-4xl mx-auto w-full my-10 p-8 rounded-lg border border-neutral-800 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text">
        {title}
      </h2>
      <div className="text-gray-300 text-lg space-y-4">{children}</div>
    </div>
  );
}

