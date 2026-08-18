import { useState } from "react";
import { testimonials } from "../constants/links";

const SCRIPT_FONT_IMPORT =
  "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&display=swap";

const pad = (n) => String(n).padStart(2, "0");

export default function LettersFromTheHouse() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [animKey, setAnimKey] = useState(0);

  const total = testimonials.length;
  const current = testimonials[index];

  const goTo = (nextIndex, dir) => {
    setDirection(dir);
    setIndex(nextIndex);
    setAnimKey((k) => k + 1);
  };

  const handleNext = () => {
    goTo((index + 1) % total, "next");
  };

  const handlePrev = () => {
    goTo((index - 1 + total) % total, "prev");
  };

  return (
    <section className="relative bg-cream overflow-visible py-20 md:py-28 px-6">
      <style>{`
        @import url('${SCRIPT_FONT_IMPORT}');

        .font-script {
          font-family: 'Dancing Script', cursive;
        }

        @keyframes letterLineIn {
          from {
            opacity: 0;
            transform: translateY(-14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .letter-line {
          opacity: 0;
          animation: letterLineIn 0.6s ease forwards;
        }

        @keyframes photoInNext {
          from {
            opacity: 0;
            transform: translateX(56px) rotate(3deg) scale(0.94);
          }

          to {
            opacity: 1;
            transform: translateX(0) rotate(3deg) scale(1);
          }
        }

        @keyframes photoInPrev {
          from {
            opacity: 0;
            transform: translateX(-56px) rotate(3deg) scale(0.94);
          }

          to {
            opacity: 1;
            transform: translateX(0) rotate(3deg) scale(1);
          }
        }

        .photo-in-next {
          animation: photoInNext 0.6s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .photo-in-prev {
          animation: photoInPrev 0.6s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .letter-line,
          .photo-in-next,
          .photo-in-prev {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          AMBIENT FLORAL DECORATION
      ====================================================== */}

      <img
        src="/images/curvedleaf.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          select-none
          absolute
          -left-12
          top-6
          w-44
          md:w-60
          opacity-60
        "
      />

      <img
        src="/images/3rdfloral.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          select-none
          absolute
          right-0
          bottom-0
          w-52
          md:w-72
          opacity-50
          hidden
          md:block
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          relative
          max-w-content
          mx-auto
          grid
          md:grid-cols-2
          gap-12
          md:gap-8
          lg:gap-10
          xl:gap-14
          items-center
        "
      >
        {/* =====================================================
            LEFT COLUMN
        ====================================================== */}

        <div className="relative z-10 text-center md:text-left">
          {/* Label */}

          <div className="flex flex-col items-center md:items-start gap-3">
            <span
              className="
                text-xs
                md:text-sm
                tracking-widest2
                text-olive-500
                font-body
                uppercase
              "
            >
              Kind Words
            </span>

            <span className="block w-10 h-px bg-olive-300" />
          </div>

          {/* Heading */}

          <h2
            className="
              font-display
              text-olive-800
              text-4xl
              sm:text-5xl
              md:text-6xl
              leading-[1.08]
              mt-6
            "
          >
            Letters from
            <br />
            the House
          </h2>

          {/* Floral divider */}

          <img
            src="/images/3rdfloral.png"
            alt=""
            aria-hidden="true"
            className="
              w-16
              mx-auto
              md:mx-0
              my-6
              opacity-80
            "
          />

          {/* Description */}

          <p
            className="
              font-body
              text-grey
              text-base
              md:text-lg
              leading-relaxed
              max-w-sm
              mx-auto
              md:mx-0
            "
          >
            Every celebration we document stays with us long after the day is
            over. These are some of the words our couples have written to us.
          </p>

          {/* Pagination */}

          <div
            className="
              mt-10
              flex
              items-center
              justify-center
              md:justify-start
              gap-6
              font-body
              text-sm
              tracking-widest2
              text-olive-600
              uppercase
            "
          >
            <button
              type="button"
              onClick={handlePrev}
              className="
                flex
                items-center
                gap-2
                hover:text-olive-800
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-olive-400
                rounded
                transition-colors
              "
            >
              <span aria-hidden="true">←</span>
              Previous
            </button>

            <span className="text-grey normal-case tracking-normal">
              {pad(index + 1)} / {pad(total)}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="
                flex
                items-center
                gap-2
                hover:text-olive-800
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-olive-400
                rounded
                transition-colors
              "
            >
              Next
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* =====================================================
            RIGHT / LAYERED COMPOSITION
        ====================================================== */}

        <div
          className="
            relative
            flex
            justify-center
            md:justify-start
            pt-16
            md:pt-10
          "
        >
          <div
            className="
              relative
              w-full
              max-w-sm
              sm:max-w-md
            "
          >
            {/* =================================================
                LAYER 1 — ENVELOPE
                BACK / BOTTOM
            ================================================== */}

            <img
              src="/images/envelop.png"
              alt=""
              aria-hidden="true"
              className="
                absolute
                z-0

                w-[62%]
                sm:w-[64%]
                md:w-[68%]
                lg:w-[70%]

                -right-5
                sm:-right-7
                md:-right-8
                lg:-right-10

                -bottom-8
                sm:-bottom-10
                md:-bottom-12
                lg:-bottom-14

                rotate-[7deg]

                drop-shadow-xl
                pointer-events-none
                select-none
              "
            />

            {/* =================================================
                LAYER 2 — TESTIMONIAL PHOTO
                MIDDLE
            ================================================== */}

            <div
              key={`photo-${animKey}`}
              className={`
  absolute
  z-10

  w-[52%]
  sm:w-[50%]
  md:w-[50%]
  lg:w-[52%]

  -top-20
  sm:-top-10
  md:-top-12
  lg:-top-14

  -right-2
  sm:-right-5
  md:-right-10
  lg:-right-14
  xl:-right-20

  ${direction === "next"
                  ? "photo-in-next"
                  : "photo-in-prev"
                }
`}
            >
              <div
                className="
                  relative
                  bg-white
                  p-1.5
                  sm:p-2
                  pb-4
                  sm:pb-5
                  shadow-2xl
                  rotate-3
                "
              >
                <img
                  src={current.url}
                  alt={`${current.name} wedding photo`}
                  className="
                    w-full
                    aspect-[4/5]
                    object-cover
                    grayscale
                  "
                />
              </div>
            </div>

            {/* =================================================
                LAYER 3 — LETTER
                FRONT / TOP
            ================================================== */}

            <div
              className="
  relative
  z-20
  w-full
  aspect-[4/5]
  -rotate-1
  drop-shadow-xl

  md:-translate-x-6
  lg:-translate-x-10
  xl:-translate-x-44
"
            >
              {/* Letter background */}

              <img
                src="/images/letterbg.png"
                alt=""
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* Letter content */}

              <div
                key={`letter-${animKey}`}
                className="
                  absolute
                  inset-0
                  flex
                  flex-col

                  p-7
                  pt-16

                  sm:p-10
                  sm:pt-20
                "
              >
                {/* Greeting */}

                <p
                  className="
                    letter-line
                    font-script
                    text-2xl
                    sm:text-3xl
                    text-olive-800
                    mb-3
                    shrink-0
                  "
                  style={{
                    animationDelay: "0.1s",
                  }}
                >
                  Dear Maya,
                </p>

                {/* Testimonial */}

                <div
                  className="
                    flex-1
                    min-h-0
                    overflow-y-auto
                    pr-1
                    [scrollbar-width:thin]
                  "
                >
                  <p
                    className="
                      letter-line
                      font-body
                      text-[13px]
                      sm:text-sm
                      leading-relaxed
                      text-olive-700
                    "
                    style={{
                      animationDelay: "0.25s",
                    }}
                  >
                    {current.text}
                  </p>
                </div>

                {/* Signature */}

                <p
                  className="
                    letter-line
                    font-script
                    text-2xl
                    sm:text-3xl
                    text-olive-800
                    text-right
                    mt-4
                    shrink-0
                  "
                  style={{
                    animationDelay: "0.45s",
                  }}
                >
                  {current.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}