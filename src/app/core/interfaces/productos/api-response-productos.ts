import { Producto } from './producto';

export interface ApiResponseProductos {
  tipo: string;
  mensajes: string[];
  data: Producto[];
}
