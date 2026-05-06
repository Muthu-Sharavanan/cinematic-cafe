import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Instagram, Coffee } from "lucide-react";
import RevealText from "./RevealText";

const Visit = () => {
  return (
    <section id="visit" className="relative w-full overflow-hidden bg-background pt-24 md:pt-40">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="text-center">
          <span className="mb-4 block text-[10px] uppercase tracking-[0.4em] text-gold">— Visit</span>
          <RevealText
            as="h2"
            text="Come slow. Stay long."
            className="font-serif-display text-5xl leading-[1] tracking-tight md:text-8xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-muted-foreground"
          >
            Reserve a table or simply walk in. The kettle is always on.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            href="#"
            className="group relative mt-10 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-gold px-10 py-4 text-sm uppercase tracking-[0.25em] text-primary-foreground shadow-gold"
          >
            <span className="relative">Reserve a Table</span>
            <Coffee className="relative h-4 w-4 transition-transform group-hover:rotate-12" strokeWidth={1.5} />
          </motion.a>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 md:grid-cols-3">
          {[
            { icon: MapPin, label: "Find us", value: "Beach Road, Thoothukudi" },
            { icon: Clock, label: "Hours", value: "Daily · 7 AM – 11 PM" },
            { icon: Phone, label: "Reserve", value: "+91 90000 00000" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-3 bg-card p-8">
              <item.icon className="h-5 w-5 text-gold" strokeWidth={1.4} />
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{item.label}</span>
              <span className="font-serif-display text-xl text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-24 border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row md:px-12">
          <div className="flex items-center gap-2">
            <Coffee className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="font-serif-display text-base text-foreground">Aardvark Cafe</span>
            <span>· Thoothukudi</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="inline-flex items-center gap-2 transition-colors hover:text-gold">
              <Instagram className="h-4 w-4" strokeWidth={1.5} /> @aardvarkcafe
            </a>
            <span>© {new Date().getFullYear()} — All rights reserved</span>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Visit;
