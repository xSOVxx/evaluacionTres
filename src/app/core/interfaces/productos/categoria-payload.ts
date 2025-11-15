export interface CategoriaPayload {
  category_id?: number;
  category_name: string;
  category_categoryid: number; // 0 para categorías, ID padre para subcategorías
  category_urlimage: string;
  category_state: string; // "ACTIVO" | "INACTIVO"
}
