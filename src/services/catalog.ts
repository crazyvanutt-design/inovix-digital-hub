// Catalog service — the single entry point pages use to read products.
// Today it reads static demo data; later swap these bodies for database queries
// (e.g. server functions) without touching the pages.
import { categories, products } from "@/data/products";
import type { Product, ProductCategory } from "@/data/types";

export function listCategories() {
  return categories;
}

export function getCategory(id: ProductCategory) {
  return categories.find((c) => c.id === id);
}

export interface ProductQuery {
  q?: string;
  categoria?: ProductCategory;
  ordem?: "relevancia" | "menor-preco" | "maior-preco" | "avaliacao";
}

export function listProducts(query: ProductQuery = {}): Product[] {
  const q = query.q?.trim().toLowerCase();
  let result = products.filter((p) => {
    if (query.categoria && p.category !== query.categoria) return false;
    if (q && !`${p.name} ${p.short} ${p.category}`.toLowerCase().includes(q)) return false;
    return true;
  });
  switch (query.ordem) {
    case "menor-preco":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "maior-preco":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "avaliacao":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
  }
  return result;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 8) {
  return products.slice(0, limit);
}
