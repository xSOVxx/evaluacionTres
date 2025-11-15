export interface ProductoPayload {
  product_id?: number;
  product_name: string;
  product_price: number;
  product_description: string;
  product_urlimage: string;
  product_state: string;
  product_stock: number;
  product_needpreparation: string; // '0' o '1'
  category_id: string;
}
