import { useEffect, useReducer } from 'react';
import { IUser, IAuthState, AuthContext } from '../../contexts/Auth.context';
import { getUser, login, logout } from '../../services/auth.service';

type AuthAction =
  | {
      type: 'LOGIN';
      payload: IUser;
    }
  | {
      type: 'LOGOUT';
    }
  | {
      type: 'SET_LOADING';
      payload: boolean;
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    }
  | {
      type: 'SET_LOADED';
      payload: boolean;
    };

const initialState: IAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isLoaded: false,
};

const AuthReducer = (state: IAuthState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LOADED':
      return { ...state, isLoaded: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const handleLogin = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await login(email, password);
      const user = await getUser();
      if (user) {
        dispatch({ type: 'LOGIN', payload: user as IUser });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.message || 'An unknown error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_LOADED', payload: true });
    }
  };

  const handleLogout = async () => {
    await logout();
    dispatch({ type: 'LOGOUT' });
  };

  const loadUser = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const user = await getUser();
      if (user) {
        dispatch({ type: 'LOGIN', payload: user as IUser });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.log('DEBUG_ERROR', error);
      dispatch({ type: 'LOGOUT' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      dispatch({ type: 'SET_LOADED', payload: true });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
