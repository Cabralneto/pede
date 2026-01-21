import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Customer Pages
import SplashScreen from "./pages/SplashScreen";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import OrdersPage from "./pages/OrdersPage";
import RestaurantsPage from "./pages/RestaurantsPage";

// Category Pages
import MarketsPage from "./pages/MarketsPage";
import PharmaciesPage from "./pages/PharmaciesPage";
import DrinksPage from "./pages/DrinksPage";
import PetShopsPage from "./pages/PetShopsPage";
import PromotionsPage from "./pages/PromotionsPage";

// Restaurant Pages
import RestaurantLoginPage from "./pages/restaurant/RestaurantLoginPage";
import RestaurantDashboardPage from "./pages/restaurant/RestaurantDashboardPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Splash Screen */}
              <Route path="/" element={<SplashScreen />} />
              
              {/* Customer Routes */}
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/restaurant/:id" element={<RestaurantPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order/:id" element={<OrderTrackingPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              
              {/* Category Routes */}
              <Route path="/restaurants" element={<RestaurantsPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/pharmacies" element={<PharmaciesPage />} />
              <Route path="/drinks" element={<DrinksPage />} />
              <Route path="/pets" element={<PetShopsPage />} />
              <Route path="/promos" element={<PromotionsPage />} />
              
              {/* Restaurant Routes */}
              <Route path="/restaurant" element={<RestaurantLoginPage />} />
              <Route path="/restaurant/dashboard" element={<RestaurantDashboardPage />} />
              
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
