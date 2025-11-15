export interface Producto {
  product_id: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_urlimage: string;
  product_state: string; // "ACTIVO" | "INACTIVO"
  product_stock: number;
  product_needpreparation: string; // '0' o '1'
  category_id: string;
  category_name?: string; // Viene del backend en algunos casos
  subcategory_id?: string;
  subcategory_name?: string;
}
