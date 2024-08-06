"use client";

import { createContext, useMemo, useState } from "react";
import { RegisterRequest } from "types/requests/RegisterRequest";
import * as RegisterService from "services/AuthService";
import { useRouter } from "next/navigation";
import {
  RegisterContextType,
  RegisterStateType,
} from "app/(auth)/signup/_type/RegisterType";

export const RegisterContext = createContext<RegisterContextType | null>(null);

const registerStateType: RegisterStateType = {
  isLoading: false,
  message: null,
  error: null,
};

const RegisterProvider = (props: any) => {
  const router = useRouter();

  const [registerState, setRegisterState] = useState(registerStateType);

  const register = async (request: RegisterRequest) => {
    setRegisterState({
      isLoading: true,
      message: null,
      error: null,
    });
    await RegisterService.register(request)
      .then((data) => {
        setRegisterState({
          isLoading: false,
          message: data,
          error: null,
        });
        router.push("/login");
      })
      .catch((error: Error) => {
        setRegisterState({
          isLoading: false,
          message: null,
          error: error.message,
        });
      });
  };

  const value = useMemo(
    () => ({
      registerState,
      register,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [registerState]
  );

  return (
    <RegisterContext.Provider value={value}>
      {props.children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
