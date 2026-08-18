export default function Films() {
  return (
    <section className="min-h-screen bg-cream text-olive flex items-center justify-center px-6">
      <div className="w-full max-w-content text-center">
        <p className="font-body text-[10px] md:text-xs uppercase tracking-widest2 text-olive/60">
          Films
        </p>

        <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
          Some moments
          <br />
          are meant to move.
        </h1>

        <p className="mx-auto mt-8 max-w-lg font-body text-sm md:text-base leading-relaxed text-olive/70">
          Our collection of cinematic stories is currently being
          crafted. We’ll be sharing films that let you relive
          the moments, long after they’ve passed.
        </p>

        <div className="mx-auto mt-10 h-px w-16 bg-sand" />

        <p className="mt-6 font-body text-[10px] md:text-xs uppercase tracking-widest2 text-olive/50">
          Films — Coming Soon
        </p>
      </div>
    </section>
  );
}