export default function Stories() {
  return (
    <section className="min-h-screen bg-cream text-olive flex items-center justify-center px-6">
      <div className="w-full max-w-content text-center">
        <p className="font-body text-[10px] md:text-xs uppercase tracking-widest2 text-olive/60">
          Stories
        </p>

        <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
          Every story
          <br />
          deserves its chapter.
        </h1>

        <p className="mx-auto mt-8 max-w-lg font-body text-sm md:text-base leading-relaxed text-olive/70">
          We’re carefully putting together a collection of stories,
          moments, and memories. Something beautiful is on its way.
        </p>

        <div className="mx-auto mt-10 h-px w-16 bg-sand" />

        <p className="mt-6 font-body text-[10px] md:text-xs uppercase tracking-widest2 text-olive/50">
          Stories — Coming Soon
        </p>
      </div>
    </section>
  );
}