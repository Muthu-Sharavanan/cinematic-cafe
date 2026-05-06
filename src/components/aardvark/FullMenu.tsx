import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const allMenuItems = [
  { category: "Pizzas", items: [
    { name: "Barbeque Chicken Pizza", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", desc: "Smoky BBQ sauce, grilled chicken, red onions" },
    { name: "Tandoori Paneer Pizza", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800", desc: "Spiced paneer, capsicum, mozzarella" },
    { name: "Classic Tandoori Pizza", img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800", desc: "Wood-fired with tandoori spices" }
  ]},
  { category: "Mains & Bites", items: [
    { name: "Crispy Chicken Burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800", desc: "Fried chicken, lettuce, house mayo" },
    { name: "Chicken Pasta Arabiata", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800", desc: "Rich tomato sauce, parmesan, basil" },
    { name: "Spicy Chicken Grilled Sandwich", img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800", desc: "Grilled to perfection with spicy filling" },
    { name: "Cream of Chicken Soup", img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800", desc: "Thick, creamy, and deeply comforting" },
    { name: "Steamed Momos", img: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&q=80&w=800", desc: "Delicate wrappers with savory filling" },
    { name: "Dragon Chicken", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800", desc: "Spicy, sticky, wok-tossed perfection" },
    { name: "Butter Chicken Puff", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800", desc: "Flaky pastry filled with rich curry" },
  ]},
  { category: "Sweets & Sips", items: [
    { name: "Death by Chocolate", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800", desc: "Dense chocolate cake with fudge frosting" },
    { name: "Chocolate Waffles", img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&q=80&w=800", desc: "Crispy outside, fluffy inside, chocolate drizzle" },
    { name: "Assorted Cupcakes", img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=80&w=800", desc: "Vanilla, chocolate, and red velvet" },
    { name: "Classic Cappuccino", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800", desc: "Espresso, steamed milk, deep foam" },
    { name: "Americano Coffee", img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?auto=format&fit=crop&q=80&w=800", desc: "Bold, smooth espresso over hot water" }
  ]}
];

const FullMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    document.addEventListener("open-full-menu", handleOpen);
    return () => document.removeEventListener("open-full-menu", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-2xl"
        >
          <div className="min-h-full px-6 py-16 md:px-12 md:py-24 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-gold uppercase tracking-[0.3em] text-xs font-bold block mb-2"
                >
                  Our Offerings
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-serif-display text-5xl md:text-7xl text-foreground"
                >
                  The Full Menu.
                </motion.h2>
              </div>
              <motion.button 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsOpen(false)}
                className="w-14 h-14 rounded-full bg-card border border-border/60 flex items-center justify-center text-foreground hover:border-gold hover:text-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="space-y-24">
              {allMenuItems.map((category, idx) => (
                <div key={category.category}>
                  <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (idx * 0.2) }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <h3 className="font-serif-display text-3xl text-gold">{category.category}</h3>
                    <div className="h-px bg-gold/20 flex-1" />
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map((item, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + (idx * 0.2) + (i * 0.1), duration: 0.8 }}
                        key={item.name} 
                        className="group relative rounded-xl overflow-hidden bg-card/40 border border-border/40 hover:border-gold/30 hover:shadow-gold transition-all duration-500 cursor-pointer"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={item.img} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                          />
                        </div>
                        <div className="p-6">
                          <h4 className="font-serif-display text-xl text-foreground mb-2 group-hover:text-gold transition-colors">{item.name}</h4>
                          <p className="text-muted-foreground text-sm">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullMenu;
