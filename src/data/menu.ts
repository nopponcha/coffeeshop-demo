export type MenuItem = {
  name: string;
  description: string;
  priceBaht: number;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "coffee",
    title: "Coffee",
    items: [
      {
        name: "Espresso",
        description: "Rich single shot, pulled fresh.",
        priceBaht: 65,
      },
      {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        priceBaht: 85,
      },
      {
        name: "Latte",
        description: "Smooth espresso with velvety steamed milk.",
        priceBaht: 90,
      },
      {
        name: "Cold Brew",
        description: "Slow-steeped for 18 hours, served over ice.",
        priceBaht: 95,
      },
    ],
  },
  {
    id: "food",
    title: "Food",
    items: [
      {
        name: "Butter Croissant",
        description: "Flaky, baked in-house every morning.",
        priceBaht: 75,
      },
      {
        name: "Avocado Toast",
        description: "Sourdough, smashed avo, chili flakes.",
        priceBaht: 120,
      },
      {
        name: "Granola Bowl",
        description: "Yogurt, house granola, seasonal fruit.",
        priceBaht: 110,
      },
    ],
  },
];

export function formatPrice(baht: number): string {
  return `฿${baht}`;
}
