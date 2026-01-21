import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, User, MapPin, ArrowRight, ChevronLeft, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

type AuthStep = 'welcome' | 'phone' | 'code' | 'register';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();
  
  const [step, setStep] = useState<AuthStep>('welcome');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    reference: '',
  });
  const [isNewUser, setIsNewUser] = useState(false);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userExists = phone.includes('9999');
    setIsNewUser(!userExists);
    setStep('code');
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewUser) {
      setStep('register');
    } else {
      await login(phone, code);
      navigate('/home');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, phone);
    navigate('/home');
  };

  const goBack = () => {
    if (step === 'phone') setStep('welcome');
    else if (step === 'code') setStep('phone');
    else if (step === 'register') setStep('code');
  };

  // Welcome screen with background image effect
  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-primary relative flex flex-col">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary" />
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 safe-top">
            <button
              onClick={() => navigate('/home')}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Logo area */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                <span className="text-primary text-4xl font-extrabold">P</span>
              </div>
              <h1 className="text-3xl font-bold text-white">PedeAí</h1>
              <p className="text-white/80 mt-2">Peça. Relaxe. Receba.</p>
            </motion.div>
          </div>

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-background rounded-t-3xl pt-6 pb-8 px-6 safe-bottom"
          >
            <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6" />

            <div className="space-y-3">
              <Button
                onClick={() => setStep('phone')}
                className="w-full h-14 text-lg font-semibold"
              >
                Já tenho uma conta
              </Button>

              <Button
                onClick={() => {
                  setIsNewUser(true);
                  setStep('phone');
                }}
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
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col safe-top">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button
          onClick={goBack}
          className="text-primary"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-foreground uppercase text-sm tracking-wide">
          {step === 'register' ? 'Criar Conta' : 'Acessar Conta'}
        </h1>
        <div className="w-6" />
      </div>

      <div className="flex-1 px-6 py-8">
        {/* Phone Step */}
        {step === 'phone' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handlePhoneSubmit}
            className="flex flex-col h-full"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Qual é o seu número de telefone?
              </h2>
              <p className="text-muted-foreground mb-8">
                Insira o número do seu telefone cadastrado para acessar sua conta
              </p>

              <div className="flex gap-3">
                {/* Country Code */}
                <div className="flex items-center gap-2 px-3 py-3 border border-border rounded-lg bg-muted/30 shrink-0">
                  <span className="text-sm">BR</span>
                  <span className="text-foreground font-medium text-sm">+55</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </div>

                {/* Phone Input */}
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="h-14 text-lg pr-10 border-border"
                      maxLength={15}
                      required
                    />
                    {phone && (
                      <button
                        type="button"
                        onClick={() => setPhone('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold mt-auto"
              disabled={phone.replace(/\D/g, '').length < 11}
            >
              Continuar
            </Button>
          </motion.form>
        )}

        {/* Code Step */}
        {step === 'code' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleCodeSubmit}
            className="flex flex-col h-full"
          >
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Código de verificação
              </h2>
              <p className="text-muted-foreground mb-8">
                Digite o código enviado para<br />
                <span className="font-medium text-foreground">{phone}</span>
              </p>

              <Input
                id="code"
                type="text"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="h-16 text-3xl text-center tracking-[0.5em] font-mono border-border"
                maxLength={6}
                required
              />

              <button
                type="button"
                className="w-full text-center text-primary font-medium mt-6"
              >
                Reenviar código
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold mt-auto"
              disabled={code.length < 6 || isLoading}
            >
              {isLoading ? 'Verificando...' : 'Verificar'}
            </Button>
          </motion.form>
        )}

        {/* Register Step */}
        {step === 'register' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleRegisterSubmit}
            className="flex flex-col h-full"
          >
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Complete seu cadastro
                </h2>
                <p className="text-muted-foreground">
                  Precisamos de algumas informações
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-medium">Endereço de entrega</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="street">Rua</Label>
                      <Input
                        id="street"
                        type="text"
                        placeholder="Nome da rua"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input
                        id="number"
                        type="text"
                        placeholder="123"
                        value={address.number}
                        onChange={(e) => setAddress({ ...address, number: e.target.value })}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-3">
                    <Label htmlFor="neighborhood">Bairro (opcional)</Label>
                    <Input
                      id="neighborhood"
                      type="text"
                      placeholder="Nome do bairro"
                      value={address.neighborhood}
                      onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2 mt-3">
                    <Label htmlFor="reference">Referência</Label>
                    <Input
                      id="reference"
                      type="text"
                      placeholder="Ex: Próximo à praça"
                      value={address.reference}
                      onChange={(e) => setAddress({ ...address, reference: e.target.value })}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold mt-6"
              disabled={!name || !address.street || !address.number || isLoading}
            >
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
