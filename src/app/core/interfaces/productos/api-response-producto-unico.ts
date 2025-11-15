import { Producto } from './producto';

export interface ApiResponseProductoUnico {
  tipo: string;
  mensajes: string[];
  data: Producto;
}
