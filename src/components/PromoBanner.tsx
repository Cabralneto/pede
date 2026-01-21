import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  bgGradient: string;
  textColor: string;
}

const banners: Banner[] = [
  {
    id: '1',
    title: 'pra refrescar',
    subtitle: '+ entrega grátis em mercados',
    discount: '40% OFF',
    bgGradient: 'bg-gradient-to-r from-amber-200 via-amber-100 to-sky-200',
    textColor: 'text-primary',
  },
  {
    id: '2',
    title: 'fome de noite?',
    subtitle: 'restaurantes abertos até tarde',
    discount: '30% OFF',
    bgGradient: 'bg-gradient-to-r from-violet-200 via-purple-100 to-pink-200',
    textColor: 'text-purple-600',
  },
  {
    id: '3',
    title: 'seu pet merece',
    subtitle: 'descontos em pet shops',
    discount: '25% OFF',
    bgGradient: 'bg-gradient-to-r from-orange-200 via-amber-100 to-yellow-200',
    textColor: 'text-orange-600',
  },
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banners[currentIndex].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={`${banners[currentIndex].bgGradient} p-6 min-h-[160px] flex flex-col justify-center`}
        >
          <p className={`text-lg font-medium ${banners[currentIndex].textColor}`}>
            {banners[currentIndex].title}
          </p>
          <div className="flex items-baseline gap-2 my-2">
            <span className={`text-4xl font-extrabold ${banners[currentIndex].textColor}`}>
              {banners[currentIndex].discount}
            </span>
          </div>
          <p className={`text-sm ${banners[currentIndex].textColor} opacity-80`}>
            {banners[currentIndex].subtitle}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'w-6 bg-foreground/80'
                : 'w-1.5 bg-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
