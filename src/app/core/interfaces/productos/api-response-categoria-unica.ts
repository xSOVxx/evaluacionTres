import { Categoria } from './categoria';

export interface ApiResponseCategoriaUnica {
  tipo: string;
  mensajes: string[];
  data: Categoria;
}
