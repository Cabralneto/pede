import React, { createContext, useContext, useState, useCallback } from 'react';
import { Cart, CartItem, Product, Restaurant } from '@/types';

interface CartContextType {
  cart: Cart | null;
  addItem: (product: Product, restaurant: Restaurant, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);

  const addItem = useCallback((product: Product, restaurant: Restaurant, quantity = 1) => {
    setCart((prevCart) => {
      // If cart is from different restaurant, clear it
      if (prevCart && prevCart.restaurantId !== restaurant.id) {
        return {
          restaurantId: restaurant.id,
          restaurant,
          items: [{ product, quantity }],
        };
      }

      // If cart doesn't exist, create new
      if (!prevCart) {
        return {
          restaurantId: restaurant.id,
          restaurant,
          items: [{ product, quantity }],
        };
      }

      // Check if item already exists
      const existingIndex = prevCart.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex >= 0) {
        const newItems = [...prevCart.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + quantity,
        };
        return { ...prevCart, items: newItems };
      }

      return {
        ...prevCart,
        items: [...prevCart.items, { product, quantity }],
      };
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setCart((prevCart) => {
      if (!prevCart) return null;

      const newItems = prevCart.items.filter(
        (item) => item.product.id !== productId
      );

      if (newItems.length === 0) return null;

      return { ...prevCart, items: newItems };
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCart((prevCart) => {
      if (!prevCart) return null;

      const newItems = prevCart.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );

      return { ...prevCart, items: newItems };
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCart(null);
  }, []);

  const getItemCount = useCallback(() => {
    if (!cart) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const getSubtotal = useCallback(() => {
    if (!cart) return 0;
    return cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const getTotal = useCallback(() => {
    if (!cart) return 0;
    return getSubtotal() + cart.restaurant.deliveryFee;
  }, [cart, getSubtotal]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getSubtotal,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
