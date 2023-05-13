import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAuthContext {
  user: {};
  setUser?: (data: any) => void;
  logout?: () => void;
}

const defaultState = {
  user: {},
};

export const AuthContext = createContext<IAuthContext>(defaultState);

export const AuthContextProvider = ({children}: any) => {
  const [user, setUser] = useState(defaultState.user);

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  const getUserFromLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        setUser(JSON.parse(value));
      }
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser({});
    } catch (e) {
      console.log(e, 'error');
    }
  };

  return (
    <AuthContext.Provider value={{user, setUser, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
