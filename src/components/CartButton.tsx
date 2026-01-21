import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function CartButton() {
  const { cart, getItemCount, getTotal } = useCart();
  const navigate = useNavigate();

  const itemCount = getItemCount();

  if (!cart || itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={() => navigate('/cart')}
        className="fixed bottom-4 left-4 right-4 bg-primary text-primary-foreground py-4 px-6 rounded-2xl pedeai-shadow-lg flex items-center justify-between z-50 safe-bottom"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-background text-primary text-xs font-bold rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          </div>
          <span className="font-medium">Ver carrinho</span>
        </div>
        <span className="font-bold">R$ {getTotal().toFixed(2)}</span>
      </motion.button>
    </AnimatePresence>
  );
}
