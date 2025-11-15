import { Cliente } from "./cliente";

export interface ApiResponseClientes {
    data: Cliente[];
  mensajes: string[];
  tipo: string;
}
