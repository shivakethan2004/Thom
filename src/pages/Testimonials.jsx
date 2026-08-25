import { motion } from "framer-motion";
import { testimonials } from "../constants/links";

const pad = (n) => String(n).padStart(2, "0");

// Soft pastel backgrounds cycled per testimonial card
const pastelBackgrounds = [
  "bg-[#F7EFE7]", // pastel cream/beige
  "bg-[#EAF1EA]", // pastel sage
  "bg-[#F3E9EC]", // pastel blush
  "bg-[#EAF0F3]", // pastel powder blue
  "bg-[#F5EEE2]", // pastel sand
];

export default function Testimonials() {
  const total = testimonials.length;

  return (
    <section className="relative bg-cream px-6 py-20 text-olive md:px-10 lg:py-28">
      <div className="relative mx-auto max-w-content">
        {/* ---- Top label ---- */}
        <span className="block text-center mt-20 font-body text-[11px] tracking-widest2 text-olive/60 md:text-left">
          TESTIMONIALS
        </span>

        {/* ---- Stacked list ---- */}
        <div className="mt-10 flex flex-col gap-20 md:mt-16 md:gap-32">
          {testimonials.map((item, index) => {
            const reversed = index % 2 === 1;
            const bgColor = pastelBackgrounds[index % pastelBackgrounds.length];

            return (
              <motion.div
                key={item.name + index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 items-center gap-10 rounded-lg p-6 md:gap-0 md:p-10 lg:p-12 ${bgColor} ${
                  reversed
                    ? "md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
                    : "md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                }`}
              >
                {/* ---- Copy ---- */}
                <div
                  className={`text-center md:text-left ${
                    reversed
                      ? "order-2 md:order-2 md:pl-12 lg:pl-16"
                      : "order-2 md:order-1 md:pr-12 lg:pr-16"
                  }`}
                >
                  <p className="font-body text-xs tracking-widest2 text-olive/50">
                    {pad(index + 1)} / {pad(total)}
                  </p>

                  <h2 className="mt-5 font-accent text-3xl font-light leading-[1.15] text-olive md:text-4xl lg:text-5xl">
                    {item.name}
                  </h2>

                  <p className="mt-6 font-body text-sm leading-relaxed text-olive/70 md:text-[15px]">
                    {item.text}
                  </p>
                </div>

                {/* ---- Photo ---- */}
                <div
                  className={`order-1 ${
                    reversed ? "md:order-1" : "md:order-2"
                  } aspect-[4/5] w-full overflow-hidden rounded-sm shadow-xl md:aspect-[4/3] lg:aspect-[16/11]`}
                >
                  <img
                    src={item.url}
                    alt={`${item.name} wedding photo`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}