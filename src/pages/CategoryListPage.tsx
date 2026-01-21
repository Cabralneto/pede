import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import type { Place } from "@/data/mockPlaces";

type Props = {
  title: string;
  subtitle?: string;
  placeholder?: string;
  items: Place[];
  onOpenItem?: (id: string) => void;
};

export default function CategoryListPage({
  title,
  subtitle,
  placeholder = "Buscar...",
  items,
  onOpenItem
}: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return items;
    return items.filter((x) =>
      x.name.toLowerCase().includes(qq) ||
      x.category.toLowerCase().includes(qq)
    );
  }, [q, items]);

  const openItems = filtered.filter((x) => x.isOpen);
  const closedItems = filtered.filter((x) => !x.isOpen);

  const open = (id: string) => {
    if (onOpenItem) onOpenItem(id);
    else navigate(`/place/${id}`);
  };

  return (
    <div className="min-h-screen bg-pedeai-gray-50 pb-8">
      {/* Header */}
      <div className="bg-primary text-primary-foreground pt-safe-top">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              {subtitle ? (
                <p className="text-sm opacity-80">{subtitle}</p>
              ) : (
                <p className="text-sm opacity-80 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Ver opções perto de você
                </p>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={placeholder}
              className="pl-10 h-12 bg-background text-foreground border-0"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Open Items */}
        {openItems.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Abertos agora
            </h2>
            <div className="space-y-3">
              {openItems.map((x, index) => (
                <motion.button
                  key={x.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => open(x.id)}
                  className="w-full text-left bg-card rounded-2xl p-4 pedeai-shadow ring-1 ring-border"
                >
                  <h3 className="font-semibold text-foreground">{x.name}</h3>
                  <p className="text-sm text-muted-foreground">{x.category}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ⭐ {x.rating.toFixed(1)} • {x.deliveryTime} •{" "}
                    {x.deliveryFee === 0
                      ? "Entrega grátis"
                      : `R$ ${x.deliveryFee.toFixed(2)}`}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium text-status-accepted bg-status-accepted/10 px-2 py-1 rounded-full">
                    Aberto
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {/* Closed Items */}
        {closedItems.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-muted-foreground mb-4">
              Fechados
            </h2>
            <div className="space-y-3">
              {closedItems.map((x, index) => (
                <motion.button
                  key={x.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (openItems.length + index) * 0.05 }}
                  onClick={() => open(x.id)}
                  className="w-full text-left bg-card rounded-2xl p-4 pedeai-shadow ring-1 ring-border opacity-60"
                  disabled
                >
                  <h3 className="font-semibold text-foreground">{x.name}</h3>
                  <p className="text-sm text-muted-foreground">{x.category}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    ⭐ {x.rating.toFixed(1)} • {x.deliveryTime} •{" "}
                    {x.deliveryFee === 0
                      ? "Entrega grátis"
                      : `R$ ${x.deliveryFee.toFixed(2)}`}
                  </p>
                  <span className="inline-block mt-2 text-xs font-medium text-status-rejected bg-status-rejected/10 px-2 py-1 rounded-full">
                    Fechado
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg font-medium text-foreground mb-1">Nada por aqui</p>
            <p className="text-muted-foreground">
              Tente outro termo de busca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
