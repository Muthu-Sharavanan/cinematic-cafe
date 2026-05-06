import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Coffee } from "lucide-react";
import heroImg from "@/assets/hero-cappuccino.jpg";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax: cup moves slower upward than backdrop
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const cupY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const cupScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.95]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-background"
    >
      {/* Background layer (slow) */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={heroImg}
          alt="Cappuccino with latte art on a dark stone table at Aardvark Cafe"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      {/* Vignette + grain */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background"
      />
      <div className="absolute inset-0 bg-radial-glow opacity-60" />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Foreground "cup" highlight layer (faster parallax illusion) */}
      <motion.div
        style={{ y: cupY, scale: cupScale }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] will-change-transform"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,hsl(var(--gold)/0.18),transparent_55%)]" />
      </motion.div>

      {/* Top nav */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12"
      >
        <a href="#" className="flex items-center gap-2 text-foreground">
          <Coffee className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="font-serif-display text-xl tracking-tight">Aardvark</span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#story" className="transition-colors hover:text-foreground">Story</a>
          <a href="#flavors" className="transition-colors hover:text-foreground">Menu</a>
          <a href="#values" className="transition-colors hover:text-foreground">Values</a>
          <a href="#visit" className="transition-colors hover:text-foreground">Visit</a>
        </nav>
        <a
          href="#visit"
          className="hidden rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[0_0_15px_rgba(198,154,83,0.3)] transition-all hover:scale-105 hover:bg-gold/90 hover:shadow-[0_0_25px_rgba(198,154,83,0.5)] md:inline-block"
        >
          Reserve Table
        </a>
      </motion.header>

      {/* Floating Coffee Beans / Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            scale: [0.5, 1, 0.5],
            y: [0, -60, 0],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 8 + (i % 5), 
            repeat: Infinity,
            delay: i * 0.7
          }}
          className="absolute hidden md:block text-gold/20 pointer-events-none z-10"
          style={{
            top: `${(i * 13) % 90}%`,
            left: `${(i * 17) % 90}%`,
          }}
        >
          <Coffee className="w-12 h-12" />
        </motion.div>
      ))}

      {/* Hero content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 flex h-full flex-col items-center justify-end px-6 pb-24 text-center md:pb-32"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-background/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <span className="h-1 w-1 rounded-full bg-gold animate-pulse" />
          Thoothukudi · Est. Aardvark
        </motion.span>

        <h1 className="font-serif-display text-5xl leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-8xl md:mt-10">
          <span className="block overflow-hidden">
            <motion.span
              className="inline-block mr-4 md:mr-8"
              initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Where
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Metro
            </motion.span>
          </span>
          <span className="block overflow-hidden italic mt-2">
            <motion.span
              className="inline-block mr-4 md:mr-6"
              initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Meets
            </motion.span>
            <motion.span
              className="inline-block text-gradient-gold"
              initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.96, ease: [0.22, 1, 0.36, 1] }}
            >
              Peaceful.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          Aardvark Cafe — Thoothukudi's cinematic sanctuary. Women-owned, LGBTQ+ friendly,
          and crafted for the moments between.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#visit"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold px-8 py-3.5 text-sm uppercase tracking-[0.25em] text-gold transition-colors duration-500 hover:text-primary-foreground"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
            <span className="relative">Reserve a Table</span>
            <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
          </a>
          <a href="#flavors" className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors">
            Explore the Menu →
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-foreground/30 p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
