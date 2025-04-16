import { createContext, useContext } from 'react';

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface IAuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface IAuthContext extends IAuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => {
  return useContext(AuthContext);
};
