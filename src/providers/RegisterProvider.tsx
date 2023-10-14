"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { RegisterRequest } from "types/requests/RegisterRequest";
import * as RegisterService from "services/AuthService";
import { useRouter } from 'next/navigation'
import { RegisterContextType, RegisterStateType } from "types/pages/Register";

export const RegisterContext = createContext<RegisterContextType | null>(null);

const registerStateType: RegisterStateType = {
  isLoading: false,
  message: null,
  error: null
}

const RegisterProvider = (props: any) => {
  const router = useRouter();

  const [registerState, setRegisterstate] = useState(registerStateType);

  const register = async (request: RegisterRequest) => {
    setRegisterstate((prevState) => ({
      isLoading: true,
      message: null,
      error: null
    }));
      await RegisterService.register(request)
      .then((data) => {
        setRegisterstate((prevState) => ({
          isLoading: false,
          message: data,
          error: null
        }));
        router.push('/login');
      })
      .catch((error: Error) => {
        setRegisterstate((prevState) => ({
          isLoading: false,
          message: null,
          error: error.message
        }));
      });
  }

  const value = {
    registerState,
    register
  }

  return (
    <RegisterContext.Provider value={value}>{props.children}</RegisterContext.Provider>
  )
}

export default RegisterProvider;