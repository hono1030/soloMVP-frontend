export interface User {
  id: string | null;
  username: string | null;
  is_admin: boolean | null;
  account_created: Date | null;
  last_login: Date | null;
}
