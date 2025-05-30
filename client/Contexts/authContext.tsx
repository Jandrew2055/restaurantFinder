import React from 'react';
import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import supabase from '../Models/supabaseClient';
import { useNavigate } from 'react-router-dom';

// Define the shape of your context
interface AuthContextType {
  //   user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ error?: any; data?: any } | void>;
  //   signup: (email: string, password: string) => Promise<{ error: any } | void>;
  //   logout: () => Promise<void>;
}

// Create context with initial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// const AuthContext = createContext();

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //as soon as application opens up check if user active
    const getUserSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) console.error('Error getting session:', error.message);
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    };

    getUserSession();
  }, []);

  //handles login with supabase, form data provided later
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('error signing in with Supabase:', error);
      return { error };
    }
    console.log('data:', data);
    //uncomment if needed
    // console.log('testing data received:', data);

    // console.log('error:', error);

    navigate('/');
    return { data };
  };

  return (
    <AuthContext.Provider value={{ loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

//hook to be used in other file/components
export const useAuth = () => useContext(AuthContext);
