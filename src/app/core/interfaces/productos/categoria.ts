export interface Categoria {
  category_id: number;
  category_name: string;
  category_categoryid: number; // 0 = categoría padre, >0 = subcategoría
  category_urlimage: string;
  category_state: string; // "ACTIVO" | "INACTIVO"
  product_count?: number; // Cantidad de productos (viene del backend)
}
