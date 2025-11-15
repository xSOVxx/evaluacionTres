export interface MesaPayload {
  table_id:       number;
  table_name:     string;
  table_state?:   string;
  table_capacity?: number;
  lounge_id:      number;
  store_id?:      number;
}