import { LoginRequest } from "types/requests/LoginRequest";

export type LoginStateType = {
    isLoading: boolean,
    message: string | null,
    error: string | null
  }
  
  export type LoginContextType = {
    loginState: LoginStateType,
    login: (request: LoginRequest) => void
  };
  