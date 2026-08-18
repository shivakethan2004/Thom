import React from "react";

export const artist = {
  name: "Sandeep",
  bio: "Sandeep is a passionate photographer and storyteller, dedicated to capturing the essence of every moment. With a keen eye for detail and a love for creativity, he brings stories to life through his lens.",
  image:
    "https://images-pw.pixieset.com/elementfield/bOGl9zb/Sandeep-998b8475-2500.jpg",
  signature: "/images/signature.png",
};

export default function ArtistSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F4F1EA] px-6 py-20 md:px-16 lg:py-28">
      {/* faint decorative branch, background right */}
      <img
        src="/images/3rdfloral.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-[28%] object-contain opacity-[0.15] mix-blend-multiply"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 md:grid-cols-[auto_1fr_1fr] md:gap-10 lg:gap-16">
        {/* vertical label */}
        <div className="hidden items-center md:flex">
          <span
            className="whitespace-nowrap text-[11px] font-medium tracking-[0.35em] text-[#5b5647]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            BEHIND THE LENS
          </span>
        </div>

        {/* image column */}
        <div className="relative mx-auto w-full max-w-[420px]">
          {/* paper card behind the photo */}
          <div
            className="absolute -right-4 top-6 h-[92%] w-full rounded-sm bg-[#e6ddcd] shadow-[0_25px_45px_-15px_rgba(0,0,0,0.25)]"
            style={{ transform: "rotate(3deg)" }}
          />

          {/* photo */}
          <div className="relative shadow-[0_35px_60px_-20px_rgba(0,0,0,0.45)]">
            <img
              src={artist.image}
              alt={artist.name}
              className="h-[560px] w-full object-cover grayscale contrast-110"
            />
          </div>

          {/* floral decoration, bottom left, overlapping the photo */}
          <img
            src="/images/3rdfloral.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 -left-10 w-40 drop-shadow-[0_10px_15px_rgba(0,0,0,0.25)] md:w-48"
          />

          {/* little washi-tape accent holding the flowers */}
       
        </div>

        {/* text column */}
        <div className="flex max-w-xl flex-col justify-center">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-semibold tracking-[0.3em] text-[#8a8368]">
              THE ARTIST
            </span>
          </div>
          <div className="mb-6 h-px w-24 bg-[#c9c0a6]" />

          <h1 className="font-serif text-5xl leading-[1.1] text-[#2c2a22] md:text-6xl">
            The mind
            <br />
            behind the <em className="italic text-[#4a5a3a]">stories</em>.
          </h1>

          <p className="mt-8 text-[15px] leading-relaxed text-[#4a473c]">
            {artist.bio}
          </p>

          <div className="mt-10">
            {artist.signature ? (
              <img
                src={artist.signature}
                alt={`${artist.name} signature`}
                className="h-14 w-auto object-contain"
              />
            ) : (
              <p className="font-serif text-3xl italic text-[#2c2a22]">
                {artist.name}
              </p>
            )}
            <p className="mt-2 text-xs font-medium tracking-[0.25em] text-[#8a8368]">
              PHOTOGRAPHER
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}