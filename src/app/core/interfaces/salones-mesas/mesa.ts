export interface Mesa {
  table_id:       number;
  table_name:     string;
  table_state:    string; // "ACTIVO" o "INACTIVO"
  table_capacity: number;
  lounge_id:      number;
  store_id:       number;
}