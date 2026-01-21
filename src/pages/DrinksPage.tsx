import CategoryListPage from "./CategoryListPage";
import { mockDrinks } from "@/data/mockPlaces";

export default function DrinksPage() {
  return (
    <CategoryListPage
      title="Bebidas"
      placeholder="Buscar bebidas..."
      items={mockDrinks}
    />
  );
}
