import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode
} from 'react';
import Constants from 'expo-constants';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { autheticatedRequest, authRequest } from '../services/authResquest';

const { CLIENT_SECRET } = process.env;
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;

type User = {
  id: string;
  login: string;
  avatar_url: string;
  followers: number;
  public_repos: number;
  name: string;
  email: string;
  bio: string;
  token: string;
}

type AuthorizationGithubData = {
  type: string;
  params: {
    code: string;
  }
}

type AuthContextData = {
  user: User;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

type AuthProviderData = {
  children: ReactNode;
}

const authContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderData) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);
  let getToken = '';

  async function signIn() {
    try {
      setLoading(true);
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`;
      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationGithubData;

      if (type === 'success') {
        const response = await authRequest.post('/access_token', {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code: params.code,
          redirect_uri: REDIRECT_URI
        })
  
        const access_token = response.data.split('=')[1];
        const token = access_token.replace('&', ' ').split(' ')[0];
        
        getToken = token;
      
        autheticatedRequest.defaults.headers.Authorization = `Bearer ${token}`;
      }

      const response = await autheticatedRequest.get('/user');

      const dataUser = {
        ...response.data,
        token: getToken
      }

      await AsyncStorage.setItem('@app-upload', JSON.stringify(dataUser));
      setUser(dataUser);

    } catch (err) {
      console.log('Autheticated Github',err);
    } finally {
      setLoading(false);
    }
  }

  async function loadStorageDataUser() {
    const storage = await AsyncStorage.getItem('@app-upload');
    
    if (storage) {
      const userLogged = JSON.parse(storage) as User;
      autheticatedRequest.defaults.headers.Authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }

  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem('@app-upload');

  }

  useEffect(() => {
    loadStorageDataUser();
  }, []);

  return (
    <authContext.Provider value={{
      user,
      signIn,
      loading,
      signOut
    }}>
      {children}
    </authContext.Provider>
  )
}

function useAuth() {
  const context = useContext(authContext);
  return context;
}

export {
  AuthProvider,
  useAuth
};