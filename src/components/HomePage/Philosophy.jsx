import Reveal from "../PageTransition/Reveal";
import Kicker from "../ui/Kicker";
import Heading from "../ui/Heading";
import Text from "../ui/Text";
import Divider from "../ui/Divider";
import { philosophy } from "../../constants/text";

function Laurel({ className }) {
  return (
    <svg viewBox="0 0 40 60" fill="none" className={className}>
      <path d="M20 2C14 10 6 14 4 24c-2 10 4 20 16 34" stroke="currentColor" strokeWidth="1" />
      {[8, 16, 24, 32, 40].map((y, i) => (
        <path key={i} d={`M${8 + i * 0.5} ${y}q6-4 10 2`} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

export default function Philosophy() {
  return (
    <section className="relative w-full bg-cream py-20 md:py-28">
      <div className="max-w-content mx-auto flex flex-col items-center px-6 text-center">
        <Reveal index={0}>
          <Kicker className="mb-5 text-olive/70">{philosophy.kicker}</Kicker>
        </Reveal>

        <Reveal index={1}>
          <Heading as="h2" size="xl" weight="font-light" className="max-w-2xl mx-auto text-olive">
            {philosophy.title}
          </Heading>
        </Reveal>

        <Reveal index={2}>
          <Divider className="my-6 text-olive/40" />
        </Reveal>

        <Reveal index={3}>
          <Text size="lg" className="max-w-xl mx-auto font-light text-olive/80">
            {philosophy.body}
          </Text>
        </Reveal>

        <Reveal index={4} className="mt-12 flex items-center gap-5 text-olive/70">
          <span className="font-body text-[0.65rem] tracking-widest2">CELEBRATING</span>
          <span className="flex items-center gap-3">
            <Laurel className="h-8 w-5 scale-x-[-1]" />
            <span className="font-display text-3xl font-light text-olive">10</span>
            <Laurel className="h-8 w-5" />
          </span>
          <span className="font-body text-[0.65rem] tracking-widest2">YEARS OF ARTISTRY</span>
        </Reveal>
      </div>
    </section>
  );
}