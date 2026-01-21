import { OrderStatus, ORDER_STATUS_LABELS } from '@/types';
import { Check, Clock, ChefHat, Package, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderStatusTrackerProps {
  currentStatus: OrderStatus;
}

const steps: { status: OrderStatus; icon: React.ReactNode; label: string }[] = [
  { status: 'pending', icon: <Clock className="w-5 h-5" />, label: 'Aguardando' },
  { status: 'accepted', icon: <Check className="w-5 h-5" />, label: 'Aceito' },
  { status: 'preparing', icon: <ChefHat className="w-5 h-5" />, label: 'Preparando' },
  { status: 'ready', icon: <Package className="w-5 h-5" />, label: 'Pronto' },
];

const statusOrder: Record<OrderStatus, number> = {
  pending: 0,
  accepted: 1,
  preparing: 2,
  ready: 3,
  rejected: -1,
};

export function OrderStatusTracker({ currentStatus }: OrderStatusTrackerProps) {
  if (currentStatus === 'rejected') {
    return (
      <div className="flex flex-col items-center py-8">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <X className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-destructive">Pedido Recusado</h3>
        <p className="text-muted-foreground text-center mt-2">
          Infelizmente o restaurante não pôde aceitar seu pedido
        </p>
      </div>
    );
  }

  const currentIndex = statusOrder[currentStatus];

  return (
    <div className="py-6">
      <div className="relative flex justify-between">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.status} className="relative flex flex-col items-center z-10">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                  isCompleted && 'bg-primary text-primary-foreground',
                  isCurrent && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                  !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {step.icon}
              </div>
              <span
                className={cn(
                  'text-xs mt-2 font-medium',
                  (isCompleted || isCurrent) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <h3 className="text-lg font-semibold text-foreground">
          {ORDER_STATUS_LABELS[currentStatus]}
        </h3>
        {currentStatus === 'pending' && (
          <p className="text-muted-foreground mt-1">
            Aguardando o restaurante confirmar seu pedido
          </p>
        )}
        {currentStatus === 'accepted' && (
          <p className="text-muted-foreground mt-1">
            O restaurante aceitou seu pedido!
          </p>
        )}
        {currentStatus === 'preparing' && (
          <p className="text-muted-foreground mt-1">
            Seu pedido está sendo preparado com carinho
          </p>
        )}
        {currentStatus === 'ready' && (
          <p className="text-muted-foreground mt-1">
            Seu pedido está pronto para entrega!
          </p>
        )}
      </div>
    </div>
  );
}
