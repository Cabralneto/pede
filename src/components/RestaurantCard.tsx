import { Restaurant } from '@/types';
import { Clock, Star, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left bg-card rounded-xl overflow-hidden pedeai-shadow',
        'transition-all duration-200 hover:pedeai-shadow-lg active:scale-[0.98]',
        !restaurant.isOpen && 'opacity-70'
      )}
    >
      <div className="relative h-32 bg-muted">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="bg-background px-4 py-2 rounded-full text-sm font-semibold text-foreground">
              Fechado
            </span>
          </div>
        )}
        {restaurant.isOpen && (
          <div className="absolute top-3 left-3">
            <span className="bg-success px-3 py-1 rounded-full text-xs font-semibold text-success-foreground">
              Aberto
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground text-lg">
              {restaurant.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {restaurant.category}
            </p>
          </div>
          {restaurant.rating && (
            <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="text-sm font-semibold text-warning">
                {restaurant.rating}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>
              {restaurant.deliveryFee === 0
                ? 'Grátis'
                : `R$ ${restaurant.deliveryFee.toFixed(2)}`}
            </span>
          </div>
        </div>

        {restaurant.minimumOrder && (
          <p className="text-xs text-muted-foreground mt-2">
            Pedido mínimo: R$ {restaurant.minimumOrder.toFixed(2)}
          </p>
        )}
      </div>
    </button>
  );
}
