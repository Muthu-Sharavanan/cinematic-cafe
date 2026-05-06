import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LucideIcon, Heart, Leaf, Sparkles, Users } from "lucide-react";
import { useRef } from "react";
import RevealText from "./RevealText";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
}

const ValueCard = ({ icon: Icon, title, body, index }: ValueCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-xl border border-border/60 bg-card/60 p-8 backdrop-blur-sm transition-shadow duration-500 hover:shadow-gold"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-radial-glow" />
        <div style={{ transform: "translateZ(40px)" }} className="relative">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-background/40">
            <Icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
          </div>
          <h3 className="font-serif-display text-2xl leading-tight text-foreground">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  );
};

const values = [
  { icon: Heart, title: "Women-Owned", body: "Built and led by women — every recipe, every hire, every detail." },
  { icon: Sparkles, title: "LGBTQ+ Friendly", body: "A safe, celebratory space. Bring your whole self to the table." },
  { icon: Leaf, title: "Slow Sourcing", body: "Locally sourced, seasonally tuned. We believe in honest ingredients." },
  { icon: Users, title: "Third Place", body: "Not home, not work — the cinematic in-between for the city." },
];

const Values = () => {
  return (
    <section id="values" className="relative w-full overflow-hidden bg-background py-24 md:py-40">
      <div className="absolute inset-0 bg-radial-glow opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.4em] text-gold">
            — Ambience & Values
          </span>
          <RevealText
            as="h2"
            text="A room with intention. A table with welcome."
            className="font-serif-display text-4xl leading-[1.05] tracking-tight md:text-6xl"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <ValueCard key={v.title} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
