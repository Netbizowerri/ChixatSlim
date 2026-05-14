import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Zap, Shield, Star, TrendingDown, Heart, CheckCircle,
  ArrowRight, Flame, Award, Users, Package, ChevronRight
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  category: string;
  badge?: string;
  description: string;
}

interface HomePageProps {
  products: Product[];
  onOpenProduct: (p: Product) => void;
  onShopAll: () => void;
  formatPrice: (n: number) => string;
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const TESTIMONIALS = [
  { name: "Adaeze M.", city: "Lagos", text: "I lost 2 dress sizes in 6 weeks! The Colombian Faja is LIFE-CHANGING. I wear it every day now.", stars: 5, before: "Size 16", after: "Size 12" },
  { name: "Chidinma O.", city: "Abuja", text: "My tummy is so flat after 3 kids — I didn't believe it was possible. ChixatSlim changed my confidence forever.", stars: 5, before: "XL", after: "M" },
  { name: "Blessing T.", city: "Port Harcourt", text: "The waist trainer helped me drop from a size 14 to size 10 in just 2 months. My husband can't stop staring!", stars: 5, before: "Size 14", after: "Size 10" },
  { name: "Ngozi A.", city: "Enugu", text: "Ordered the combo pack — absolutely worth every naira. My shape has never looked this good.", stars: 5, before: "2XL", after: "L" },
];

const BENEFITS = [
  { icon: TrendingDown, title: "Accelerate Fat Reduction", desc: "Thermogenic compression technology heats your core, boosting calorie burn by up to 30% during workouts." },
  { icon: Zap, title: "Instant Slimming Effect", desc: "See visible results the moment you put it on. Cinch your waist, flatten your tummy, lift your curves." },
  { icon: Heart, title: "Posture & Back Support", desc: "Reinforced panels align your spine, relieve back pain, and train your core muscles all day long." },
  { icon: Shield, title: "Medical-Grade Compression", desc: "Colombian-certified shapewear built to post-op standards — safe, breathable, and built to last." },
];

const STEPS = [
  { num: "01", title: "Choose Your Shape Goal", desc: "Waist sculpting, tummy control, full-body shaping — we have the perfect garment for your goal." },
  { num: "02", title: "Pick Your Size & Style", desc: "From XS to 5XL, our Colombian-crafted pieces fit every body type with maximum comfort." },
  { num: "03", title: "Wear & Transform Daily", desc: "6–8 hours a day is all it takes. Pair with light exercise for dramatically accelerated results." },
];

const FEATURED_IDS = [1, 2, 3, 6, 7, 8];

export default function HomePage({ products, onOpenProduct, onShopAll, formatPrice }: HomePageProps) {
  const featured = products.filter(p => FEATURED_IDS.includes(p.id));

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
        {/* background orbs */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f97316, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #fb7185, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-4 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left copy */}
          <div>
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
                <Flame size={13} /> Nigeria's #1 Body Transformation Brand
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6"
            >
              Sculpt Your{" "}
              <span className="gradient-text">Dream</span>
              <br />Body — <span className="gradient-text">Starting</span>
              <br />Today.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Premium Colombian shapewear, waist trainers & tummy control designed to accelerate your weight-loss journey — and give you the silhouette you deserve, instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={onShopAll}
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-full text-base flex items-center gap-2 animate-glow transition"
              >
                Shop & Transform <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" })}
                className="glass border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-base flex items-center gap-2 hover:bg-white/10 transition"
              >
                See Results <ChevronRight size={18} />
              </motion.button>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-8"
            >
              {[
                { val: "10,000+", label: "Happy Customers" },
                { val: "4.9★", label: "Average Rating" },
                { val: "2–6 Weeks", label: "Results Seen" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-black text-orange-400">{s.val}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — product hero image stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Glow ring */}
              <div className="absolute inset-8 rounded-full blur-3xl opacity-30"
                style={{ background: "linear-gradient(135deg,#f97316,#fb7185)" }} />

              {/* Main product image */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img
                  src="https://i.ibb.co/FLmpGMSN/Whats-App-Image-2026-05-05-at-6-54-32-AM.jpg"
                  alt="Colombian Faja Premium Shapewear"
                  className="w-full rounded-3xl shadow-2xl object-cover"
                  style={{ maxHeight: 520 }}
                />
              </motion.div>

              {/* Floating badge 1 */}
              <motion.div
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-6 top-16 glass-white rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingDown size={15} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Instant Slimming</p>
                    <p className="text-[10px] text-gray-500">Up to 3 inches lost</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="absolute -left-6 bottom-24 glass-white rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star size={15} className="text-orange-500 fill-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Best Seller</p>
                    <p className="text-[10px] text-gray-500">Colombian Faja</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-gray-500 text-xs uppercase tracking-widest">Scroll</p>
          <div className="w-px h-10 bg-gradient-to-b from-orange-500 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-orange-500 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
            {[
              { icon: Users, val: "10,000+", label: "Transformed Bodies" },
              { icon: Award, val: "100%", label: "Colombian Certified" },
              { icon: Package, val: "Fast", label: "Nationwide Delivery" },
              { icon: Star, val: "4.9/5", label: "Customer Rating" },
            ].map(({ icon: Icon, val, label }) => (
              <motion.div key={label} whileHover={{ scale: 1.05 }} className="flex flex-col items-center gap-1">
                <Icon size={20} className="opacity-80" />
                <p className="text-2xl font-black">{val}</p>
                <p className="text-orange-100 text-xs">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Your Journey</span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-2">
                How ChixatSlim <span className="gradient-text">Works</span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">Three simple steps to the body you've always wanted.</p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200" />
            {STEPS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.15}>
                <motion.div whileHover={{ y: -6 }} className="text-center relative">
                  <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-black text-2xl relative"
                    style={{ background: "linear-gradient(135deg,#f97316,#fbbf24)" }}>
                    {step.num}
                    <div className="absolute inset-0 rounded-full animate-pulse-ring opacity-30"
                      style={{ background: "linear-gradient(135deg,#f97316,#fbbf24)" }} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FadeUp>
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Our Collection</span>
                <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-2">
                  Featured <span className="gradient-text">Products</span>
                </h2>
                <p className="text-gray-500 mt-3 max-w-lg">Premium Colombian shapewear designed to sculpt, support, and transform — every single day.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={onShopAll}
                className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full text-sm transition"
              >
                View All <ArrowRight size={16} />
              </motion.button>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
            {featured.map((product, i) => (
              <FadeUp key={product.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  onClick={() => onOpenProduct(product)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.images[0] + "?w=500"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                      <span className="bg-white text-orange-600 font-bold text-sm px-5 py-2 rounded-full">
                        Quick View
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{product.description.slice(0, 70)}...</p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-600 font-black text-lg">{formatPrice(product.price)}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center transition"
                        onClick={(e) => { e.stopPropagation(); onOpenProduct(product); }}
                      >
                        <ArrowRight size={15} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.2}>
            <div className="text-center mt-10">
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={onShopAll}
                className="md:hidden bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-full text-sm transition inline-flex items-center gap-2"
              >
                View All Products <ArrowRight size={16} />
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24" style={{ background: "linear-gradient(135deg,#0f0f0f,#1a0a00)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">Why It Works</span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-2">
                Science-Backed <span className="gradient-text">Results</span>
              </h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-6">
            {BENEFITS.map((b, i) => (
              <FadeUp key={b.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: "rgba(249,115,22,0.6)" }}
                  className="glass rounded-2xl p-6 flex gap-5 cursor-default border border-white/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#f97316,#fbbf24)" }}>
                    <b.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg mb-2">{b.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSFORMATION / TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Real Stories</span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-gray-900 mt-2">
                Women Who <span className="gradient-text">Transformed</span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto">Real customers, real bodies, real results — no filters, no lies.</p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
                  style={{ background: i % 2 === 0 ? "#fff" : "linear-gradient(135deg,#fff7ed,#fff)" }}
                >
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} size={14} className="text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ background: "linear-gradient(135deg,#f97316,#fbbf24)" }}>
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-red-50 text-red-500 font-bold px-2 py-1 rounded-full">{t.before}</span>
                      <ArrowRight size={12} className="text-gray-400" />
                      <span className="bg-green-50 text-green-600 font-bold px-2 py-1 rounded-full">{t.after}</span>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "100% Authentic", desc: "Colombian certified shapewear only" },
              { icon: Zap, title: "Fast Delivery", desc: "Nationwide shipping in days" },
              { icon: CheckCircle, title: "7-Day Returns", desc: "Not happy? We'll fix it" },
              { icon: Heart, title: "10K+ Satisfied", desc: "Join our community of winners" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#fff7ed,#ffedd5)" }}>
                    <Icon size={22} className="text-orange-500" />
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at center, #f97316 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <FadeUp>
            <span className="text-orange-400 font-bold text-sm uppercase tracking-widest block mb-4">Start Today</span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Your <span className="gradient-text">Dream Body</span><br />Is One Click Away
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Over 10,000 Nigerian women have already transformed their bodies. Don't wait — your journey starts now.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={onShopAll}
              className="bg-orange-500 hover:bg-orange-400 text-white font-black px-10 py-5 rounded-full text-lg animate-glow inline-flex items-center gap-3 transition"
            >
              Shop Now & Transform <Flame size={20} />
            </motion.button>
            <p className="text-gray-500 text-sm mt-6">📞 Call to Order: 07006000000 · 02018883300</p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
