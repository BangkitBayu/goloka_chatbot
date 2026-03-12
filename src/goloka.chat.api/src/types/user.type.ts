export interface User {
  fullname: string;
  company?: string | undefined;
  email: string;
  password: string;
  avatar?: string;
  phoneNumber?: string;
}
