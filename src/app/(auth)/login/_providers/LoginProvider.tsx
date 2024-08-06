"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { LoginRequest } from "types/requests/LoginRequest";
import * as LoginService from "services/AuthService";
import { useRouter } from "next/navigation";
import { AppContext } from "../../../_providers/AppProvider";
import Loading from "components/limb/loading/Loading";
import { AppContextType } from "app/_type/AppType";
import {
  LoginContextType,
  LoginStateType,
} from "app/(auth)/login/_type/LoginType";

export const LoginContext = createContext<LoginContextType | null>(null);

const loginStateType: LoginStateType = {
  isLoading: false,
  message: null,
  error: null,
};

const LoginProvider = (props: any) => {
  const router = useRouter();

  const [loginState, setLoginState] = useState(loginStateType);
  const { loadUser, appState, setAppState } = useContext(
    AppContext
  ) as AppContextType;

  useEffect(() => {
    setAppState({
      ...appState,
      isLoading: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (request: LoginRequest) => {
    setLoginState((prevState) => ({
      isLoading: true,
      message: null,
      error: null,
    }));
    await LoginService.login(request)
      .then((data) => {
        setLoginState((prevState) => ({
          isLoading: false,
          message: data,
          error: null,
        }));
        loadUser();
        router.push("/home");
      })
      .catch((error: Error) => {
        setLoginState((prevState) => ({
          isLoading: false,
          message: null,
          error: error.message,
        }));
      });
  };

  const value = {
    loginState,
    login,
  };
  if (appState.isLoading) {
    return <Loading />;
  } else {
    return (
      <LoginContext.Provider value={value}>
        {props.children}
      </LoginContext.Provider>
    );
  }
};

export default LoginProvider;
