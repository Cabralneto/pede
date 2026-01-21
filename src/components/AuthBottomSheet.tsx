import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export function AuthBottomSheet({ isOpen, onClose, onLogin, onRegister }: AuthBottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 safe-bottom"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
            </div>

            <div className="px-6 pb-8 pt-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Bem-vindo ao PedeAí</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={onLogin}
                  className="w-full h-14 text-lg font-semibold"
                >
                  Já tenho uma conta
                </Button>

                <Button
                  onClick={onRegister}
                  variant="outline"
                  className="w-full h-14 text-lg font-semibold border-primary text-primary hover:bg-primary/5"
                >
                  Criar nova conta
                </Button>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Ao continuar, você concorda com nossos{' '}
                <span className="text-primary">Termos de Uso</span> e{' '}
                <span className="text-primary">Política de Privacidade</span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
