//  Crear/Editar un salón
export interface SalonPayload {
  lounge_id?:    number | null; 
  lounge_name:   string;
  cantidad_mesas: number;
  lounge_state:  string;    // "ACTIVO" o "INACTIVO"
  store_id:      number;    
}