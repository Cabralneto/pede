import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Category images
import restaurantsImg from '@/assets/categories/restaurants.png';
import marketsImg from '@/assets/categories/markets.png';
import pharmaciesImg from '@/assets/categories/pharmacies.png';
import drinksImg from '@/assets/categories/drinks.png';
import offersImg from '@/assets/categories/offers.png';
import promosImg from '@/assets/categories/promos.png';
import gourmetImg from '@/assets/categories/gourmet.png';
import petsImg from '@/assets/categories/pets.png';

interface Category {
  id: string;
  name: string;
  image: string;
  route: string;
  badge?: string;
}

const categories: Category[] = [
  { id: 'restaurants', name: 'Restaurantes', image: restaurantsImg, route: '/restaurants' },
  { id: 'markets', name: 'Mercados', image: marketsImg, route: '/markets' },
  { id: 'pharmacies', name: 'Farmácias', image: pharmaciesImg, route: '/pharmacies', badge: 'Novo' },
  { id: 'drinks', name: 'Bebidas', image: drinksImg, route: '/drinks', badge: 'Novo' },
  { id: 'offers', name: 'Ofertas', image: offersImg, route: '/promos' },
  { id: 'promos', name: 'Promoções', image: promosImg, route: '/promos' },
  { id: 'gourmet', name: 'Gourmet', image: gourmetImg, route: '/home' },
  { id: 'pets', name: 'Pet Shops', image: petsImg, route: '/pets' },
];

export function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-3">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => navigate(category.route)}
          className="flex flex-col items-center gap-2 p-2 rounded-xl bg-card hover:bg-accent transition-colors relative"
        >
          {category.badge && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded">
              {category.badge}
            </span>
          )}
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs font-medium text-foreground text-center leading-tight">
            {category.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
