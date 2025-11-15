import { Categoria } from './categoria';

export interface ApiResponseCategorias {
  tipo: string; // "1" para éxito
  mensajes: string[];
  data: Categoria[];
}
