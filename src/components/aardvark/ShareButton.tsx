import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Twitter, Facebook, Linkedin, Link as LinkIcon, Check, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SHARE_TITLE = "Aardvark Cafe — Where Metro Meets Peaceful";
const SHARE_TEXT = "Thoothukudi's cinematic sanctuary. Women-owned, LGBTQ+ friendly.";

const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const enc = encodeURIComponent;
  const links = [
    { name: "Twitter", icon: Twitter, href: `https://twitter.com/intent/tweet?text=${enc(SHARE_TITLE)}&url=${enc(url)}` },
    { name: "Facebook", icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { name: "LinkedIn", icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: "WhatsApp", icon: MessageCircle, href: `https://wa.me/?text=${enc(`${SHARE_TITLE} — ${url}`)}` },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    setOpen((v) => !v);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="absolute bottom-16 right-0 w-64 origin-bottom-right rounded-xl border border-border/60 bg-card/95 p-3 shadow-deep backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-2 pb-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Share</span>
              <button onClick={() => setOpen(false)} aria-label="Close share menu">
                <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" strokeWidth={1.5} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/90 transition-colors hover:bg-secondary hover:text-gold"
                >
                  <l.icon className="h-4 w-4" strokeWidth={1.5} />
                  {l.name}
                </a>
              ))}
              <button
                onClick={copy}
                className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-foreground/90 transition-colors hover:bg-secondary hover:text-gold"
              >
                {copied ? <Check className="h-4 w-4 text-gold" strokeWidth={1.5} /> : <LinkIcon className="h-4 w-4" strokeWidth={1.5} />}
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNativeShare}
        aria-label="Share Aardvark Cafe"
        className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-card/80 text-gold shadow-gold backdrop-blur-md transition-colors hover:text-primary-foreground"
      >
        <span className="absolute inset-0 -translate-y-full bg-gradient-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
        <Share2 className="relative h-5 w-5" strokeWidth={1.5} />
      </motion.button>
    </div>
  );
};

export default ShareButton;
