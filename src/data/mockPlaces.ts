export type Place = {
  id: string;
  name: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  isOpen: boolean;
};

export const mockMarkets: Place[] = [
  {
    id: "m1",
    name: "Mercado Central",
    category: "Mercado",
    rating: 4.6,
    deliveryTime: "35-55 min",
    deliveryFee: 6.9,
    isOpen: true
  },
  {
    id: "m2",
    name: "Supermercado Bom Preço",
    category: "Mercado",
    rating: 4.3,
    deliveryTime: "40-60 min",
    deliveryFee: 5.5,
    isOpen: true
  },
  {
    id: "m3",
    name: "Mercearia do João",
    category: "Mercearia",
    rating: 4.7,
    deliveryTime: "25-40 min",
    deliveryFee: 4.0,
    isOpen: false
  }
];

export const mockPharmacies: Place[] = [
  {
    id: "p1",
    name: "Farmácia Popular",
    category: "Farmácia",
    rating: 4.7,
    deliveryTime: "25-45 min",
    deliveryFee: 4.9,
    isOpen: true
  },
  {
    id: "p2",
    name: "Drogaria São José",
    category: "Farmácia",
    rating: 4.5,
    deliveryTime: "30-50 min",
    deliveryFee: 5.5,
    isOpen: true
  },
  {
    id: "p3",
    name: "Farmácia 24h",
    category: "Farmácia",
    rating: 4.2,
    deliveryTime: "20-35 min",
    deliveryFee: 6.0,
    isOpen: false
  }
];

export const mockDrinks: Place[] = [
  {
    id: "d1",
    name: "Bebidas Express",
    category: "Bebidas",
    rating: 4.5,
    deliveryTime: "20-35 min",
    deliveryFee: 0,
    isOpen: true
  },
  {
    id: "d2",
    name: "Adega do Vinho",
    category: "Vinhos e Destilados",
    rating: 4.8,
    deliveryTime: "30-45 min",
    deliveryFee: 5.0,
    isOpen: true
  },
  {
    id: "d3",
    name: "Distribuidora Gelada",
    category: "Cervejas",
    rating: 4.6,
    deliveryTime: "15-25 min",
    deliveryFee: 3.5,
    isOpen: false
  }
];

export const mockPetShops: Place[] = [
  {
    id: "pet1",
    name: "Pet Shop Amigo",
    category: "Pet Shop",
    rating: 4.8,
    deliveryTime: "30-50 min",
    deliveryFee: 5.9,
    isOpen: true
  },
  {
    id: "pet2",
    name: "Mundo Animal",
    category: "Pet Shop",
    rating: 4.4,
    deliveryTime: "35-55 min",
    deliveryFee: 6.5,
    isOpen: true
  },
  {
    id: "pet3",
    name: "Bicho Bom",
    category: "Ração e Acessórios",
    rating: 4.6,
    deliveryTime: "40-60 min",
    deliveryFee: 4.5,
    isOpen: false
  }
];

export const mockPromotions: Place[] = [
  {
    id: "pr1",
    name: "Ofertas do Dia",
    category: "Promoções",
    rating: 4.4,
    deliveryTime: "30-60 min",
    deliveryFee: 0,
    isOpen: true
  },
  {
    id: "pr2",
    name: "Combo Família",
    category: "Combos",
    rating: 4.7,
    deliveryTime: "35-50 min",
    deliveryFee: 0,
    isOpen: true
  },
  {
    id: "pr3",
    name: "Super Descontos",
    category: "Promoções",
    rating: 4.3,
    deliveryTime: "25-40 min",
    deliveryFee: 2.0,
    isOpen: false
  }
];
