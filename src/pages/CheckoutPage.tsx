import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, MapPin, CreditCard, Banknote, Check, Smartphone, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { PaymentMethod, PAYMENT_METHOD_LABELS } from '@/types';

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  disabled?: boolean;
}

const paymentOptions: PaymentOption[] = [
  { 
    id: 'cash', 
    label: 'Dinheiro', 
    icon: Banknote,
    description: 'Pague em dinheiro na entrega'
  },
  { 
    id: 'pix', 
    label: 'PIX', 
    icon: Smartphone,
    description: 'Chave PIX será informada pelo restaurante'
  },
  { 
    id: 'card', 
    label: 'Cartão na entrega', 
    icon: CreditCard,
    description: 'Débito ou crédito na maquininha'
  },
  { 
    id: 'online', 
    label: 'Pagamento online', 
    icon: Wifi,
    description: 'Em breve',
    disabled: true
  },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getSubtotal, getTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [needsChange, setNeedsChange] = useState(false);
  const [changeFor, setChangeFor] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!cart) {
    navigate('/home');
    return null;
  }

  const total = getTotal();
  const changeAmount = changeFor ? parseFloat(changeFor) - total : 0;
  const isChangeValid = !needsChange || (changeFor && parseFloat(changeFor) >= total);

  const handleSubmit = async () => {
    if (paymentMethod === 'cash' && needsChange && !isChangeValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order creation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear cart and navigate to order tracking
    clearCart();
    navigate('/order/order1', { replace: true }); // Using mock order ID
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 bg-background z-10 px-4 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="font-semibold text-foreground text-lg">Finalizar pedido</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">
        {/* Delivery Address */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-4 pedeai-shadow"
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Endereço de entrega</h2>
          </div>
          {user?.defaultAddress && (
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {user.defaultAddress.street}, {user.defaultAddress.number}
              </p>
              {user.defaultAddress.neighborhood && (
                <p>{user.defaultAddress.neighborhood}</p>
              )}
              {user.defaultAddress.reference && (
                <p className="mt-1 text-xs">Ref: {user.defaultAddress.reference}</p>
              )}
            </div>
          )}
        </motion.section>

        {/* Payment Method */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl p-4 pedeai-shadow"
        >
          <h2 className="font-semibold text-foreground mb-4">Forma de pagamento</h2>
          <div className="space-y-2">
            {paymentOptions.map(({ id, label, icon: Icon, description, disabled }) => (
              <button
                key={id}
                onClick={() => !disabled && setPaymentMethod(id)}
                disabled={disabled}
                className={cn(
                  'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                  disabled && 'opacity-50 cursor-not-allowed',
                  paymentMethod === id && !disabled
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                  paymentMethod === id && !disabled ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground block">{label}</span>
                  {description && (
                    <span className="text-xs text-muted-foreground">{description}</span>
                  )}
                </div>
                {paymentMethod === id && !disabled && (
                  <Check className="w-5 h-5 text-primary shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Cash Change Section */}
          <AnimatePresence>
            {paymentMethod === 'cash' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNeedsChange(false)}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all',
                        !needsChange
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border text-muted-foreground'
                      )}
                    >
                      Não preciso de troco
                    </button>
                    <button
                      onClick={() => setNeedsChange(true)}
                      className={cn(
                        'flex-1 py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all',
                        needsChange
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border text-muted-foreground'
                      )}
                    >
                      Preciso de troco
                    </button>
                  </div>

                  <AnimatePresence>
                    {needsChange && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="changeFor" className="text-sm text-muted-foreground">
                          Troco para quanto?
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            R$
                          </span>
                          <Input
                            id="changeFor"
                            type="number"
                            step="0.01"
                            min={total}
                            placeholder={`Mínimo R$ ${total.toFixed(2)}`}
                            value={changeFor}
                            onChange={(e) => setChangeFor(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        {changeFor && parseFloat(changeFor) >= total && (
                          <p className="text-sm text-primary font-medium">
                            Troco: R$ {changeAmount.toFixed(2)}
                          </p>
                        )}
                        {changeFor && parseFloat(changeFor) < total && (
                          <p className="text-sm text-destructive">
                            O valor deve ser maior que R$ {total.toFixed(2)}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PIX Info */}
          <AnimatePresence>
            {paymentMethod === 'pix' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border overflow-hidden"
              >
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    📱 A chave PIX será exibida após confirmar o pedido.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Notes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-4 pedeai-shadow"
        >
          <Label htmlFor="notes" className="font-semibold text-foreground mb-3 block">
            Observações (opcional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Ex: Tirar a cebola, entregar na portaria..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none"
            rows={3}
          />
        </motion.section>

        {/* Order Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl p-4 pedeai-shadow"
        >
          <h2 className="font-semibold text-foreground mb-4">Resumo do pedido</h2>
          
          <div className="space-y-2 mb-4">
            {cart.items.map((item) => (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}x {item.product.name}
                </span>
                <span className="text-foreground">
                  R$ {(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">R$ {getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxa de entrega</span>
              <span className="text-foreground">R$ {cart.restaurant.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-primary">R$ {getTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Pagamento</span>
              <span className="text-foreground font-medium">
                {PAYMENT_METHOD_LABELS[paymentMethod]}
              </span>
            </div>
            {paymentMethod === 'cash' && needsChange && changeFor && parseFloat(changeFor) >= total && (
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Troco para</span>
                <span className="text-foreground">R$ {parseFloat(changeFor).toFixed(2)}</span>
              </div>
            )}
          </div>
        </motion.section>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 safe-bottom">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || (paymentMethod === 'cash' && needsChange && !isChangeValid)}
          className="w-full h-14 text-lg font-semibold"
        >
          {isSubmitting ? 'Enviando pedido...' : `Enviar pedido • R$ ${getTotal().toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
}
