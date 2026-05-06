import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import RevealText from "./RevealText";
import interiorImg from "@/assets/cafe-interior.jpg";

const Story = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section id="story" className="relative w-full overflow-hidden bg-background py-24 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-12">
        {/* Text */}
        <div className="flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 text-[10px] uppercase tracking-[0.4em] text-gold"
          >
            — Our Story
          </motion.span>

          <RevealText
            as="h2"
            text="A sanctuary built between cinema and silence."
            className="font-serif-display text-4xl leading-[1.05] tracking-tight md:text-6xl"
          />

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            <p>
              Born in the heart of Thoothukudi, Aardvark Cafe is a slow rebellion against the rush.
              We blend the pace of a modern metro hub with the hush of a Sunday morning.
            </p>
            <p>
              Every plate, every pour, every playlist is curated for the in-between — the conversations
              that matter, the work that breathes, the meals that linger.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex items-center gap-6"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
            <span className="font-serif-display text-sm italic text-muted-foreground">est. with intention</span>
          </motion.div>
        </div>

        {/* Image with directional reveal */}
        <div ref={ref} className="relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-deep">
            <motion.img
              src={interiorImg}
              alt="Quiet morning interior of Aardvark Cafe"
              width={1024}
              height={1024}
              loading="lazy"
              initial={{ scale: 1.2 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full object-cover"
            />
            {/* directional wipe */}
            <motion.div
              initial={{ scaleY: 1 }}
              animate={inView ? { scaleY: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-0 bg-background"
            />
          </div>

          {/* Floating caption card */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 -left-4 max-w-[220px] rounded-lg border border-border/60 bg-card/80 p-5 shadow-card backdrop-blur-md md:-left-10"
          >
            <p className="font-serif-display text-2xl leading-tight text-foreground">
              06:42 <span className="text-gold">AM</span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              First light, first pour.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
