// Domain types shared by the demo data and (future) database/API layer.
// Keep these stable so swapping the mock data for real queries is a drop-in change.

export type ProductCategory =
  | "religiosas"
  | "miniaturas"
  | "chaveiros"
  | "luminarias"
  | "resina";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  brand: "INOVIX" | "3D CÊNTRICO";
  price: number; // BRL, demonstrative
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  short: string;
  description: string;
  material: string;
  size: string;
  leadTime: string;
  customizable: boolean;
  badge?: string;
  colors: string[];
}

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  image: string;
}

export type ToolCategory = "documentos" | "imagens" | "calculadoras" | "ia" | "utilidades";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string; // lucide icon name, resolved in ToolIcon
  popular?: boolean;
  pro?: boolean;
  uses: string;
}

export interface Course {
  id: string;
  title: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  duration: string;
  lessons: number;
  topic: "Impressão 3D" | "Inteligência Artificial" | "Design" | "Produtividade";
  free: boolean;
  image: string;
}

export interface Plan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  color?: string;
}
