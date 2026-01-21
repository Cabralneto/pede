import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Minus, Plus, Trash2, MapPin, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem, getSubtotal, getTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="p-4 border-b border-border">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl">🛒</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Carrinho vazio</h2>
          <p className="text-muted-foreground text-center mt-2">
            Adicione itens de um restaurante para fazer seu pedido
          </p>
          <Button
            onClick={() => navigate('/home')}
            className="mt-6"
          >
            Ver restaurantes
          </Button>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  const minimumOrderMet = !cart.restaurant.minimumOrder || getSubtotal() >= cart.restaurant.minimumOrder;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-4 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-foreground">Carrinho</h1>
              <p className="text-sm text-muted-foreground">{cart.restaurant.name}</p>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="text-destructive text-sm font-medium"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="px-4 py-4">
        <div className="space-y-3">
          {cart.items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-card rounded-xl p-4 pedeai-shadow"
            >
              <div className="flex gap-3">
                {item.product.image && (
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{item.product.name}</h3>
                  <p className="text-primary font-semibold mt-1">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-destructive text-sm flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Remover
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery Address */}
        {isAuthenticated && user?.defaultAddress && (
          <div className="mt-6 bg-card rounded-xl p-4 pedeai-shadow">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Endereço de entrega</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {user.defaultAddress.street}, {user.defaultAddress.number}
                    {user.defaultAddress.neighborhood && ` - ${user.defaultAddress.neighborhood}`}
                  </p>
                  {user.defaultAddress.reference && (
                    <p className="text-sm text-muted-foreground">
                      {user.defaultAddress.reference}
                    </p>
                  )}
                </div>
              </div>
              <button className="text-primary">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="mt-6 bg-card rounded-xl p-4 pedeai-shadow">
          <h3 className="font-semibold text-foreground mb-4">Resumo do pedido</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">R$ {getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxa de entrega</span>
              <span className="text-foreground">R$ {cart.restaurant.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border text-base font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">R$ {getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Minimum Order Warning */}
        {!minimumOrderMet && cart.restaurant.minimumOrder && (
          <div className="mt-4 bg-warning/10 rounded-xl p-4 text-center">
            <p className="text-sm text-warning font-medium">
              Pedido mínimo: R$ {cart.restaurant.minimumOrder.toFixed(2)}
            </p>
            <p className="text-xs text-warning/80 mt-1">
              Faltam R$ {(cart.restaurant.minimumOrder - getSubtotal()).toFixed(2)}
            </p>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 safe-bottom">
        <Button
          onClick={handleCheckout}
          disabled={!minimumOrderMet}
          className="w-full h-14 text-lg font-semibold"
        >
          {isAuthenticated ? 'Finalizar pedido' : 'Entrar para continuar'}
        </Button>
      </div>
    </div>
  );
}
