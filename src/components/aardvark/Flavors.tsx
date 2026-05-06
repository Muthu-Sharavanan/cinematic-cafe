import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RevealText from "./RevealText";

import korean from "@/assets/dish-korean-chicken.jpg";
import rice from "@/assets/dish-japanese-rice.jpg";
import pizza from "@/assets/dish-bbq-pizza.jpg";
import dessert from "@/assets/dish-dessert.jpg";

const dishes = [
  { img: korean, name: "Korean Crispy Chicken", tag: "Signature", note: "Gochujang glaze · sesame · scallion" },
  { img: rice, name: "Japanese Fried Rice", tag: "House", note: "Wok-tossed · soft yolk · prawn" },
  { img: pizza, name: "BBQ Chicken Pizza", tag: "Wood-fired", note: "Smoked mozzarella · red onion" },
  { img: dessert, name: "Gold Leaf Dessert", tag: "Patisserie", note: "Dark chocolate · raspberry coulis" },
];

const Flavors = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
    containScroll: false,
  });
  const [selected, setSelected] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section id="flavors" className="relative w-full overflow-hidden bg-background py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-[10px] uppercase tracking-[0.4em] text-gold">
              — Signature Flavors
            </span>
            <RevealText
              as="h2"
              text="Plates that linger longer than the playlist."
              className="font-serif-display text-4xl leading-[1.05] tracking-tight md:text-6xl max-w-3xl"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous dish"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/60 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next dish"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/60 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex touch-pan-y gap-6 px-6 md:gap-10 md:px-[12vw]">
            {dishes.map((d, i) => {
              const isActive = i === selected;
              return (
                <div
                  key={d.name}
                  className="relative shrink-0 basis-[80%] sm:basis-[55%] lg:basis-[40%]"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.5,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-deep"
                  >
                    <img
                      src={d.img}
                      alt={d.name}
                      width={1024}
                      height={1280}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{d.tag}</span>
                      <h3 className="mt-2 font-serif-display text-2xl leading-tight text-foreground md:text-3xl">
                        {d.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {dishes.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="h-px transition-all duration-500"
              style={{
                width: i === selected ? 40 : 16,
                backgroundColor: i === selected ? "hsl(var(--gold))" : "hsl(var(--border))",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Flavors;
