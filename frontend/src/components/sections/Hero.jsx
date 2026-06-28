import bleachSupreme from "../../assets/images/bleachSupreme.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen w-full bg-zinc-950 overflow-hidden"
    >
      {/* Background Image with a subtle dark overlay for text contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src={bleachSupreme}
          alt="Hero background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />
      </div>

      {/* Content Container - Flex-centered for perfect responsiveness */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-24 md:pb-32">
        <div className="max-w-4xl space-y-4">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-zinc-400 font-light">
            New Collection
          </p>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-comfortaa font-light tracking-tight text-white leading-tight">
            Style your desire
          </h1>
          <div className="pt-4">
            <a
              href="#shop"
              className="inline-block text-xs tracking-widest text-white uppercase border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-colors duration-300"
            >
              Explore Shop &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
