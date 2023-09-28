"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { LoginRequest } from "types/requests/LoginRequest";
import * as LoginService from "services/AuthService";
import { useRouter } from 'next/navigation'
import { AppContext, AppContextType } from "./AppProvider";
import Loading from "components/limb/loading/Loading";

type LoginStateType = {
  isLoading: boolean,
  message: string | null,
  error: string | null
}

export type LoginContextType = {
  loginState: LoginStateType,
  login: (request: LoginRequest) => void
};

export const LoginContext = createContext<LoginContextType | null>(null);

const loginStateType: LoginStateType = {
  isLoading: false,
  message: null,
  error: null
}

const LoginProvider = (props: any) => {
  const router = useRouter()

  const [loginState, setLoginstate] = useState(loginStateType);
  const { loadUser, appState, setAppState } = useContext(AppContext) as AppContextType;

  useEffect(() => {
    setAppState({
      ...appState,
      isLoading: false
    })
  }, []);

  const login = async (request: LoginRequest) => {
    setLoginstate((prevState) => ({
      isLoading: true,
      message: null,
      error: null
    }));
    await LoginService.login(request)
      .then((data) => {
        setLoginstate((prevState) => ({
          isLoading: false,
          message: data,
          error: null
        }));
        loadUser();
        router.push('/home');
      })
      .catch((error: Error) => {
        setLoginstate((prevState) => ({
          isLoading: false,
          message: null,
          error: error.message
        }));
      });
  }

  const value = {
    loginState,
    login
  }
  if (appState.isLoading) {
    return <Loading />
  } else {
    return (
      <LoginContext.Provider value={value}>{props.children}</LoginContext.Provider>
    )
  }
}

export default LoginProvider;