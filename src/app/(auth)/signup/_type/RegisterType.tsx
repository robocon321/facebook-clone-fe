import { RegisterRequest } from "types/requests/RegisterRequest";

export type RegisterStateType = {
  isLoading: boolean;
  message: string | null;
  error: string | null;
};

export type RegisterContextType = {
  registerState: RegisterStateType;
  register: (request: RegisterRequest) => void;
};
