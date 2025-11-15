// Esta interface define la respuesta COMPLETA del login
// basada en el JSON real de tu consola.

import { UsuarioInterface } from "./usuario.interface";

export interface LoginResponse {
  tipo: string;
  mensajes: string[];
  logs: string[];
  data: {
    user_id: string;
    user_uid: string;
    user_email: string;
    user_password: string;
    user_name: string;
    user_phone: string | null;
    user_address: string | null;
    user_country: string | null;
    user_birthdate: string | null;
    user_photo: string | null;
    user_registrationdate: string;
    user_rol: string;
    user_state: string;
    user_emailverified: string | null;
    token: string;
  };
}
