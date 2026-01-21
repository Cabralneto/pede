import { Product, Restaurant } from '@/types';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  restaurant: Restaurant;
}

export function ProductCard({ product, restaurant }: ProductCardProps) {
  const { cart, addItem, removeItem, updateQuantity } = useCart();

  const cartItem = cart?.items.find((item) => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    if (restaurant.isOpen) {
      addItem(product, restaurant);
    }
  };

  const handleRemove = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  return (
    <div
      className={cn(
        'flex gap-3 p-3 bg-card rounded-xl',
        !product.isAvailable && 'opacity-50'
      )}
    >
      <div className="flex-1">
        <h4 className="font-medium text-foreground">{product.name}</h4>
        {product.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-primary font-semibold mt-2">
          R$ {product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col items-center justify-between">
        {product.image && (
          <div className="w-20 h-20 rounded-lg bg-muted overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {product.isAvailable && restaurant.isOpen && (
          <div className="flex items-center gap-2 mt-2">
            {quantity > 0 ? (
              <>
                <button
                  onClick={handleRemove}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center font-semibold">{quantity}</span>
                <button
                  onClick={handleAdd}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {!product.isAvailable && (
          <span className="text-xs text-muted-foreground mt-2">Indisponível</span>
        )}
      </div>
    </div>
  );
}
