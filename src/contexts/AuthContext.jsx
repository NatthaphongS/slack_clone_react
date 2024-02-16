import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { addAccessToken, getAccessToken } from '../utils/local-storage';
import axios from '../config/axios';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  console.log(authUser);

  useEffect(() => {
    if (getAccessToken()) {
      axios
        .get('/auth/me')
        .then((res) => {
          console.log(res);
          setAuthUser(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setInitialLoading(false));
    } else {
      setInitialLoading(false);
    }
  }, []);

  const login = async (credentail) => {
    try {
      const res = await axios.post('/auth/login', credentail);

      // console.log(res);
      addAccessToken(res.data.accessToken);
      setAuthUser(res.data.user);
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        return { error: [error.response.data.message] };
      }
    }
  };

  const register = async (registerInputObject) => {
    try {
      const res = await axios.post('/auth/register', registerInputObject);
    } catch (error) {
      console.log(error);
      if (error.response.data.statusCode === 409) {
        return { error: [error.response.data.message] };
      }
      return { error: error.response.data.message };
    }
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        authUser,
        setAuthUser,
        initialLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
