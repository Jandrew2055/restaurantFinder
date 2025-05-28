import React from 'react';
import { useEffect, useState, useContext, createContext } from 'react';
import supabase from '../Models/supabaseClient';

const AuthContext = createContext();

const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //as soon as application opens up check if user active
    const getUserSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      }
    };

    getUserSession();
  }, []);
};

export default AuthProvider;
