export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-5 text-gray-100 tracking-tight">
        <span className="bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text">
          GGDEVS
        </span>
      </h1>
      <p className="max-w-sm text-lg md:text-xl text-gray-400 mb-8">
        Minimal, modern Kubernetes solutions for developers. Built by devs, for devs.
      </p>
    </section>
  );
}

