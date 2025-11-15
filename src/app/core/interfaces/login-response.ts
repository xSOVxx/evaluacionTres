export interface LoginResponse {
  data: {
    user_id:             string;
    user_uid:            string;
    user_email:          string;
    user_password:       string;
    user_emailverified:  null;
    user_phone:          null;
    user_photo:          null;
    user_name:           string;
    user_address:        null;
    user_birthdate:      null;
    user_country:        null;
    user_state:          string;
    user_rol:            string;
    user_registrationdate: string;
    token:               string; 
  };
  mensajes: string[];
  tipo:     string;
  logs:     string[];
}