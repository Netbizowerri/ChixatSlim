import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, Menu, X, Phone, Star } from "lucide-react";
import HomePage from "./components/HomePage";

// ─── Types ────────────────────────────────────────────────────────
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

interface CartItem {
  productId: number;
  size: string;
  color: string;
  quantity: number;
}

interface ToastMessage {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

// ─── Product Data ─────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Colombian Faja - Classic",
    price: 60000,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    colors: ["Black", "Skin"],
    images: [
      "https://i.ibb.co/FLmpGMSN/Whats-App-Image-2026-05-05-at-6-54-32-AM.jpg",
      "https://i.ibb.co/mCLcJKVD/Whats-App-Image-2026-05-05-at-6-54-32-AM-2.jpg",
    ],
    category: "Faja",
    badge: "Best Seller",
    description:
      "Premium Colombian shapewear designed for maximum waist control and body sculpting. Features reinforced compression panels, breathable fabric, and comfortable boning for all-day wear.",
  },
  {
    id: 2,
    name: "Colombian Faja - Sport",
    price: 60000,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    colors: ["Black", "Skin"],
    images: [
      "https://i.ibb.co/pjN3xf89/Whats-App-Image-2026-05-05-at-6-54-31-AM-1.jpg",
      "https://i.ibb.co/67W4P0qm/Whats-App-Image-2026-05-05-at-6-54-32-AM-1.jpg",
    ],
    category: "Faja",
    badge: "New Arrival",
    description:
      "Athletic-inspired Colombian faja with enhanced mobility and support. Perfect for workouts, post-surgery recovery, or everyday shaping. Double-layer compression technology.",
  },
  {
    id: 3,
    name: "Tummy Control Tight",
    price: 45000,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    colors: ["Black"],
    images: [
      "https://i.ibb.co/99BySG7z/Whats-App-Image-2026-05-05-at-6-55-49-AM.jpg",
      "https://i.ibb.co/VYkvr28b/Whats-App-Image-2026-05-05-at-6-55-50-AM-1.jpg",
      "https://i.ibb.co/mF6zsyyK/Whats-App-Image-2026-05-05-at-6-55-50-AM.jpg",
      "https://i.ibb.co/CNZ9zSt/Whats-App-Image-2026-05-05-at-6-55-49-AM-1.jpg",
    ],
    category: "Tummy Control",
    badge: "Hot Deal",
    description:
      "High-waist tummy control tight with targeted abdominal compression. Seamless design prevents rolling, provides smooth silhouette under any outfit.",
  },
  {
    id: 4,
    name: "Tummy Control Tight Shorts",
    price: 45000,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    colors: ["Black", "Skin"],
    images: [
      "https://i.ibb.co/CK09fHZ2/Whats-App-Image-2026-05-05-at-6-57-00-AM-3.jpg",
      "https://i.ibb.co/JWsbNbS7/Whats-App-Image-2026-05-05-at-6-57-00-AM-2.jpg",
      "https://i.ibb.co/Z6F8KK0R/Whats-App-Image-2026-05-05-at-6-57-00-AM-1.jpg",
      "https://i.ibb.co/4nqpZ3wd/Whats-App-Image-2026-05-05-at-6-57-00-AM.jpg",
    ],
    category: "Shorts",
    badge: "Popular",
    description:
      "Tummy control compression shorts with extended thigh coverage. Non-slip silicone grip prevents riding up. Ideal for wearing under skirts, dresses, and shorts.",
  },
  {
    id: 5,
    name: "Tummy Wrap",
    price: 7000,
    sizes: [],
    colors: [],
    images: [
      "https://i.ibb.co/RGX3W7Gv/Whats-App-Image-2026-05-05-at-6-57-24-AM.jpg",
      "https://i.ibb.co/DDTghWmn/Whats-App-Image-2026-05-05-at-6-57-25-AM.jpg",
    ],
    category: "Wraps",
    badge: "Budget Pick",
    description:
      "Lightweight tummy wrap for everyday waist support and gentle compression. Easy to wear, adjustable, and ideal for quick shaping throughout the day.",
  },
  {
    id: 6,
    name: "Tummy Compressing Waist Trainer",
    price: 40000,
    sizes: [],
    colors: [],
    images: [
      "https://i.ibb.co/B5pYmD9z/Whats-App-Image-2026-05-05-at-7-00-17-AM.jpg",
    ],
    category: "Waist Trainer",
    badge: "Trending",
    description:
      "Firm compression waist trainer built to sculpt your midsection, support posture, and enhance your silhouette during workouts or daily wear.",
  },
  {
    id: 7,
    name: "Seamless Body Shaper Open Back",
    price: 30000,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    colors: ["Black", "Skin"],
    images: [
      "https://i.ibb.co/0pZRWx0F/Whats-App-Image-2026-05-05-at-7-12-32-AM.jpg",
      "https://i.ibb.co/rGvh1vNj/Whats-App-Image-2026-05-05-at-7-12-31-AM-1.jpg",
      "https://i.ibb.co/G3krzC3Y/Whats-App-Image-2026-05-05-at-7-12-31-AM.jpg",
      "https://i.ibb.co/cc97bfg0/Whats-App-Image-2026-05-05-at-7-12-30-AM-1.jpg",
      "https://i.ibb.co/j9rcgDBV/Whats-App-Image-2026-05-05-at-7-12-30-AM.jpg",
      "https://i.ibb.co/KcGQtPmr/Whats-App-Image-2026-05-05-at-7-12-29-AM.jpg",
    ],
    category: "Body Shaper",
    badge: "Editor’s Pick",
    description:
      "Seamless open-back body shaper that smooths the waist, tummy, and hips while staying invisible under dresses and occasion wear.",
  },
  {
    id: 8,
    name: "Full Combo (4 Different Products)",
    price: 56000,
    sizes: [],
    colors: [],
    images: [
      "https://i.ibb.co/bnj0yVz/Gemini-Generated-Image-rgmwfhrgmwfhrgmw-1.png",
      "https://i.ibb.co/LdQFMjzB/Whats-App-Image-2026-05-05-at-7-20-28-AM-1.jpg",
      "https://i.ibb.co/qVL2w5H/Whats-App-Image-2026-05-05-at-7-20-28-AM.jpg",
      "https://i.ibb.co/XkGKYDZV/Whats-App-Image-2026-05-05-at-7-20-27-AM-1.jpg",
      "https://i.ibb.co/ch40VZst/Whats-App-Image-2026-05-05-at-7-20-27-AM.jpg",
    ],
    category: "Combo",
    badge: "Value Bundle",
    description:
      "Complete slimming combo bundle with four different body-shaping essentials. Includes a mix of our top-rated waist trainers, tummy control tights, and wraps for a complete body transformation.",
  },
  {
    id: 9,
    name: "Seamless Body Shaper Closed Back",
    price: 30000,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    colors: ["Black"],
    images: [
      "https://i.ibb.co/XkLFPt46/Whats-App-Image-2026-05-05-at-7-13-53-AM.jpg",
      "https://i.ibb.co/gLW8TZYH/Whats-App-Image-2026-05-05-at-7-13-54-AM-1.jpg",
      "https://i.ibb.co/1G1NLvzx/Whats-App-Image-2026-05-05-at-7-13-54-AM.jpg",
    ],
    category: "Body Shaper",
    badge: "Classic",
    description:
      "Seamless closed-back body shaper designed for full torso compression and smooth lines. Perfect for everyday wear under any outfit with maximum coverage and support.",
  },
  {
    id: 10,
    name: "3 Product Combo",
    price: 46000,
    sizes: [],
    colors: [],
    images: [
      "https://i.ibb.co/cnhf3Z6/Gemini-Generated-Image-6ynlq26ynlq26ynl-1.png",
      "https://i.ibb.co/XkGKYDZV/Whats-App-Image-2026-05-05-at-7-20-27-AM-1.jpg",
      "https://i.ibb.co/LdQFMjzB/Whats-App-Image-2026-05-05-at-7-20-28-AM-1.jpg",
      "https://i.ibb.co/qVL2w5H/Whats-App-Image-2026-05-05-at-7-20-28-AM.jpg",
    ],
    category: "Combo",
    badge: "Special Offer",
    description:
      "Our curated 3-product combo pack. Get three high-performance body shaper essentials at a discounted bundle price. Perfect for maintaining your silhouette throughout the week.",
  },
];

const CATEGORIES = [
  { id: "all", name: "All Products", icon: "🛍️" },
  { id: "Faja", name: "Colombian Faja", icon: "✨" },
  { id: "Tummy Control", name: "Tummy Control", icon: "🔥" },
  { id: "Shorts", name: "Shorts", icon: "👗" },
  { id: "Wraps", name: "Tummy Wraps", icon: "🎀" },
  { id: "Waist Trainer", name: "Waist Trainers", icon: "🏋️" },
  { id: "Body Shaper", name: "Body Shapers", icon: "💃" },
  { id: "Combo", name: "Combo Deals", icon: "📦" },
];

const BANNERS = [
  {
    bg: "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFB347 100%)",
    title: "Just Got Paid Deals!",
    subtitle: "Up to 20% OFF on all Colombian Fajas",
    cta: "Shop Now",
  },
  {
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    title: "New Arrivals 🔥",
    subtitle: "Premium Tummy Control Collection",
    cta: "Explore",
  },
  {
    bg: "linear-gradient(135deg, #e91e63 0%, #9c27b0 50%, #673ab7 100%)",
    title: "Flash Sale! ⚡",
    subtitle: "Buy 2 Fajas Get a Tummy Tight Free",
    cta: "Grab Deal",
  },
];

const PRIVYR_WEBHOOK =
  "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/GH2rwKlg#generic-webhook";

// ─── ImgBB thumbnail helper ──────────────────────────────────────
// Appends size query param to get smaller thumbnails from imgbb
function imgThumb(url: string, size = 400): string {
  return `${url}?w=${size}`;
}

// ─── Utility Functions ────────────────────────────────────────────
function formatPrice(price: number): string {
  return `₦${price.toLocaleString()}`;
}

function sendOrderNotification(
  orderData: Record<string, unknown>
): Promise<void> {
  return fetch(PRIVYR_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  }).then(() => {});
}

// ─── Main App ─────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState<"home" | "shop">("home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toastIdRef = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const bannerTimerRef = useRef<any>(undefined);

  // Banner auto-rotation
  useEffect(() => {
    bannerTimerRef.current = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(bannerTimerRef.current);
  }, []);

  // Toast auto-dismiss
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  // Body scroll lock
  useEffect(() => {
    if (cartOpen || selectedProduct || checkoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [cartOpen, selectedProduct, checkoutOpen]);

  const addToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const addToCart = useCallback(() => {
    if (!selectedProduct) return;

    const finalSize = selectedProduct.sizes.length > 0 ? selectedSize : "Standard";
    const finalColor = selectedProduct.colors.length > 0 ? selectedColor : "Standard";

    if (selectedProduct.sizes.length > 0 && !selectedSize) {
      addToast("Please select a size", "error");
      return;
    }
    if (selectedProduct.colors.length > 0 && !selectedColor) {
      addToast("Please select a color", "error");
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.productId === selectedProduct.id &&
          item.size === finalSize &&
          item.color === finalColor
      );
      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: selectedProduct.id,
          size: finalSize,
          color: finalColor,
          quantity: 1,
        },
      ];
    });

    addToast(`${selectedProduct.name} added to cart!`, "success");
    setCartOpen(true);
    setSelectedProduct(null);
    setSelectedImageIndex(0);
    setSelectedSize("");
    setSelectedColor("");
  }, [selectedProduct, selectedSize, selectedColor, addToast]);

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback(
    (index: number, delta: number) => {
      setCart((prev) =>
        prev.map((item, i) => {
          if (i !== index) return item;
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        })
      );
    },
    []
  );

  const cartTotal = cart.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = category === "all" || p.category === category;
    const matchesSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
    setSelectedSize("");
    setSelectedColor("");
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderItems = cart.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return {
        product: product?.name || "",
        price: product?.price || 0,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        subtotal: (product?.price || 0) * item.quantity,
      };
    });

    const orderPayload = {
      type: "new_order",
      store: "CHIXAT SLIM FIT",
      customer: {
        name: orderForm.name,
        phone: orderForm.phone,
        email: orderForm.email,
        address: orderForm.address,
        city: orderForm.city,
        state: orderForm.state,
      },
      items: orderItems,
      total: cartTotal,
      timestamp: new Date().toISOString(),
    };

    try {
      await sendOrderNotification(orderPayload);
      setOrderPlaced(true);
      setCart([]);
      addToast("Order placed successfully! ", "success");
    } catch {
      addToast("Order submitted! We'll contact you soon.", "success");
      setOrderPlaced(true);
      setCart([]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* ─── Toast Notifications ─── */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg px-4 py-3 shadow-lg text-white text-sm font-medium animate-slide-in ${
              toast.type === "success"
                ? "bg-green-500"
                : toast.type === "error"
                  ? "bg-red-500"
                  : "bg-blue-500"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      {/* ─── Top Call-to-Order Bar ─── */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-center py-2 text-sm font-semibold flex items-center justify-center gap-2"
      >
        <Phone size={13} /> CALL TO ORDER: 07006000000 &nbsp;|&nbsp; 02018883300
      </motion.div>

      {/* ─── Header ─── */}
      <header className="bg-white shadow-md sticky top-0 z-50" style={{ backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-1 text-gray-700 hover:text-orange-500 transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <button onClick={() => setView("home")} className="text-left">
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
                  <span className="text-orange-500">CHIXAT</span>
                  <span className="text-gray-800"> SLIM FIT</span>
                  <Star size={14} className="inline text-orange-400 ml-1 fill-orange-400" />
                </h1>
              </button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 hidden md:flex max-w-2xl">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Search products, brands and categories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm"
                />
                <button className="bg-orange-500 text-white px-6 py-2.5 rounded-r-lg hover:bg-orange-600 transition font-semibold text-sm">
                  Search
                </button>
              </div>
            </div>

            {/* Mobile search icon */}
            <button className="md:hidden ml-auto mr-2">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Shop Nav link */}
            <button
              onClick={() => setView("shop")}
              className="hidden md:flex items-center gap-1.5 text-gray-700 hover:text-orange-500 transition text-sm font-semibold"
            >
              <Search size={16} /> Shop All
            </button>

            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 text-gray-700 hover:text-orange-500 transition text-sm font-medium"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart size={20} />
              <span className="hidden md:inline font-semibold">Cart</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-2 -right-1 md:-right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Mobile search */}
          <div className="md:hidden mt-2">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-orange-400 text-sm"
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-6 py-3 text-sm flex items-center gap-3 hover:bg-orange-50 transition ${
                  category === cat.id
                    ? "bg-orange-50 text-orange-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ─── HOME PAGE VIEW ─── */}
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <HomePage
              products={PRODUCTS}
              onOpenProduct={openProduct}
              onShopAll={() => setView("shop")}
              formatPrice={formatPrice}
            />
          </motion.div>
        )}

        {view === "shop" && (
          <motion.div key="shop" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            {/* ─── SHOP Header ─── */}
            <div className="bg-gradient-to-r from-orange-500 to-amber-400 py-10 text-white text-center">
              <h2 className="text-3xl md:text-4xl font-black font-display">Our Full Collection</h2>
              <p className="mt-2 text-orange-100 text-sm">Premium shapewear for every body — sculpt, support, and shine.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex gap-4">
          {/* ─── Desktop Sidebar ─── */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 text-sm">
                  Categories
                </h3>
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 hover:bg-orange-50 transition border-b border-gray-50 last:border-b-0 ${
                    category === cat.id
                      ? "bg-orange-50 text-orange-600 font-semibold border-l-4 border-l-orange-500"
                      : "text-gray-700"
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
              <div className="p-4 bg-orange-50">
                <div className="bg-orange-500 text-white rounded-lg p-3 text-center">
                  <p className="font-bold text-sm">CALL TO ORDER</p>
                  <p className="text-xs mt-1">07006000000</p>
                  <p className="text-xs">02018883300</p>
                </div>
              </div>
            </div>
          </aside>

          {/* ─── Main Area ─── */}
          <main className="flex-1 min-w-0">
            {/* Hero Banner */}
            <div
              className="rounded-lg overflow-hidden mb-4 relative"
              style={{ background: BANNERS[bannerIndex].bg }}
            >
              <div className="p-6 md:p-10 text-white relative z-10">
                <h2 className="text-2xl md:text-4xl font-extrabold mb-2">
                  {BANNERS[bannerIndex].title}
                </h2>
                <p className="text-base md:text-lg opacity-90 mb-4">
                  {BANNERS[bannerIndex].subtitle}
                </p>
                <button
                  onClick={() => setCategory("Faja")}
                  className="bg-white text-orange-500 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-100 transition"
                >
                  {BANNERS[bannerIndex].cta} →
                </button>
              </div>
              {/* Dots */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {BANNERS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setBannerIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition ${
                      i === bannerIndex ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Category Pills (Mobile) */}
            <div className="flex gap-2 overflow-x-auto pb-3 lg:hidden scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                    category === cat.id
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">
                {category === "all"
                  ? "All Products"
                  : CATEGORIES.find((c) => c.id === category)?.name || "Products"}
              </h3>
              <span className="text-sm text-gray-500">
                {filteredProducts.length} items
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <div className="text-5xl mb-4"></div>
                <p className="text-gray-500 text-lg">No products found</p>
                <button
                  onClick={() => {
                    setCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-orange-500 font-medium hover:underline text-sm"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
                    onClick={() => openProduct(product)}
                  >
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      <img
                        src={imgThumb(product.images[0], 400)}
                        alt={product.name}
                        loading="lazy"
                        width="400"
                        height="400"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='14'%3EImage%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      {product.badge && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.badge}
                        </span>
                      )}
                      {/* Quick add on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                        <span className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                          Quick View
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug mb-1.5">
                        {product.name}
                      </h4>
                      <p className="text-lg font-bold text-orange-600">
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex items-center gap-1 mt-1.5">
                        {product.sizes.slice(0, 4).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="text-[10px] text-gray-400">
                            +{product.sizes.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Banners */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {[
                { icon: "🚚", title: "Free Delivery", desc: "On orders over ₦100k" },
                { icon: "", title: "Easy Returns", desc: "7-day return policy" },
                { icon: "💯", title: "Authentic Products", desc: "100% genuine items" },
                { icon: "📞", title: "24/7 Support", desc: "Call us anytime" },
              ].map((promo, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 text-center shadow-sm"
                >
                  <div className="text-2xl mb-2">{promo.icon}</div>
                  <p className="font-bold text-sm text-gray-800">
                    {promo.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{promo.desc}</p>
                </div>
              ))}
            </div>
          </main>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Product Detail Modal ─── */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Gallery */}
              <div className="bg-gray-50 p-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-white mb-3">
                  <img
                    src={imgThumb(selectedProduct.images[selectedImageIndex], 800)}
                    alt={selectedProduct.name}
                    width="800"
                    height="800"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23f0f0f0' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='18'%3EImage%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {selectedProduct.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${
                        i === selectedImageIndex
                          ? "border-orange-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={imgThumb(img, 150)}
                        alt={`${selectedProduct.name} - view ${i + 1}`}
                        loading="lazy"
                        width="150"
                        height="150"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23ccc' font-size='10'%3EImg%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                {selectedProduct.badge && (
                  <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {selectedProduct.badge}
                  </span>
                )}

                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {selectedProduct.name}
                </h2>

                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="text-3xl font-extrabold text-orange-600 mb-6">
                  {formatPrice(selectedProduct.price)}
                </div>

                {/* Size Selector */}
                {selectedProduct.sizes.length > 0 ? (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Size: <span className="text-orange-500">{selectedSize || "Select"}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition ${
                            selectedSize === size
                              ? "border-orange-500 bg-orange-50 text-orange-600"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    Ready to order — no size selection required.
                  </div>
                )}

                {/* Color Selector */}
                {selectedProduct.colors.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Color:{" "}
                      <span className="text-orange-500">
                        {selectedColor || "Select"}
                      </span>
                    </p>
                    <div className="flex gap-3">
                      {selectedProduct.colors.map((color) => {
                        const colorMap: Record<string, string> = {
                          Black: "bg-black",
                          Skin: "bg-amber-200",
                        };
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 transition flex items-center justify-center ${
                              selectedColor === color
                                ? "border-orange-500 ring-2 ring-orange-300"
                                : "border-gray-300"
                            } ${colorMap[color] || "bg-gray-200"}`}
                            title={color}
                          >
                            {selectedColor === color && (
                              <svg className="w-4 h-4 text-white drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={addToCart}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-lg transition text-base flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Cart Drawer ─── */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/50"
          onClick={() => setCartOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">
                Shopping Cart ({cartCount})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm mt-1">Add some amazing products!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => {
                    const product = PRODUCTS.find(
                      (p) => p.id === item.productId
                    );
                    if (!product) return null;
                    return (
                      <div
                        key={index}
                        className="flex gap-3 bg-gray-50 rounded-lg p-3"
                      >
                        <img
                          src={imgThumb(product.images[0], 160)}
                          alt={product.name}
                          loading="lazy"
                          width="160"
                          height="160"
                          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect fill='%23f0f0f0' width='80' height='80'/%3E%3C/svg%3E";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 truncate">
                            {product.name}
                          </h4>
                          {(item.size !== "Standard" || item.color !== "Standard") && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.size !== "Standard" && `Size: ${item.size}`}
                              {item.size !== "Standard" && item.color !== "Standard" && " | "}
                              {item.color !== "Standard" && `Color: ${item.color}`}
                            </p>
                          )}
                          <p className="text-sm font-bold text-orange-600 mt-1">
                            {formatPrice(product.price)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(index, -1)
                                }
                                className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm font-bold"
                              >
                                −
                              </button>
                              <span className="text-sm font-semibold w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(index, 1)
                                }
                                className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm font-bold"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-red-400 hover:text-red-600 text-xs font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-3">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total:</span>
                  <span className="text-orange-600">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
                >
                  CHECKOUT ({formatPrice(cartTotal)})
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-orange-500 font-medium text-sm hover:underline text-center"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Checkout Modal ─── */}
      {checkoutOpen && !orderPlaced && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 p-4 pt-8 md:pt-16 overflow-y-auto"
          onClick={() => setCheckoutOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Checkout</h3>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Order Summary
                </h4>
                {cart.map((item, i) => {
                  const product = PRODUCTS.find(
                    (p) => p.id === item.productId
                  );
                  if (!product) return null;
                  return (
                    <div
                      key={i}
                      className="flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-600">
                        {product.name}
                        {(item.size !== "Standard" || item.color !== "Standard") && (
                          <>
                            {" "}
                            (
                            {[item.size !== "Standard" ? item.size : null, item.color !== "Standard" ? item.color : null]
                              .filter(Boolean)
                              .join(" / ")}
                            )
                          </>
                        )}{" "}
                        × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(product.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
                <div className="flex justify-between text-base font-bold pt-3 mt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-orange-600">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderForm.name}
                    onChange={(e) =>
                      setOrderForm((f) => ({
                        ...f,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={orderForm.phone}
                    onChange={(e) =>
                      setOrderForm((f) => ({
                        ...f,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm"
                    placeholder="e.g. 08012345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={orderForm.email}
                    onChange={(e) =>
                      setOrderForm((f) => ({
                        ...f,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={orderForm.address}
                    onChange={(e) =>
                      setOrderForm((f) => ({
                        ...f,
                        address: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm resize-none"
                    placeholder="House address, street name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderForm.city}
                      onChange={(e) =>
                        setOrderForm((f) => ({
                          ...f,
                          city: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm"
                      placeholder="Lagos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderForm.state}
                      onChange={(e) =>
                        setOrderForm((f) => ({
                          ...f,
                          state: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 text-sm"
                      placeholder="Lagos State"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3.5 rounded-lg transition text-base mt-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `PLACE ORDER — ${formatPrice(cartTotal)}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ─── Order Success Modal ─── */}
      {orderPlaced && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Order Placed! 🎉
            </h3>
            <p className="text-gray-500 mb-6">
              Thank you for shopping with CHIXAT SLIM FIT! Our team will contact
              you shortly to confirm your order.
            </p>
            <div className="bg-orange-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-orange-700 font-medium">
                📞 Need help? Call us at:
              </p>
              <p className="text-orange-600 font-bold mt-1">
                07006000000 / 02018883300
              </p>
            </div>
            <button
              onClick={() => {
                setOrderPlaced(false);
                setCheckoutOpen(false);
                setOrderForm({
                  name: "",
                  phone: "",
                  email: "",
                  address: "",
                  city: "",
                  state: "",
                });
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* ─── Footer ─── */}
      <footer className="text-white mt-8" style={{ background: "linear-gradient(135deg,#0f0f0f,#1a0a00)" }}>
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-extrabold mb-3">
                <span className="text-orange-400">CHIXAT</span> SLIM FIT
                <span className="ml-1 text-orange-300">★</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your trusted source for premium Colombian shapewear and tummy
                control products. Transform your body with confidence.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-orange-400">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCategory("all")}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    All Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("Faja")}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Colombian Faja
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("Tummy Control")}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Tummy Control
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCategory("Shorts")}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Compression Shorts
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-orange-400">
                Contact Us
              </h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>📞 07006000000</p>
                <p> 02018883300</p>
                <p> info@chixatslimfit.com</p>
                <p>📍 Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-6 text-center text-gray-500 text-sm">
            © 2026 <span className="text-orange-400 font-bold">CHIXAT SLIM FIT</span>. All rights reserved. Premium Weightloss & Body Transformation Products.
          </div>
        </div>
      </footer>

      {/* ─── Global Styles ─── */}
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
