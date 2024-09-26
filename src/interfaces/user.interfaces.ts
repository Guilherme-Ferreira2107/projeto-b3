export interface IUserState {
  name: string;
  lastName: string;
  country: string;
  email: string;
  isAuthenticated?: boolean;
  darkMode?: boolean;
  allowNotifications?: boolean;
  language?: string;
}
