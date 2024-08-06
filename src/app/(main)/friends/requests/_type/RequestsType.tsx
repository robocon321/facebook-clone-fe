import { Dispatch, SetStateAction } from "react";
import { ProfileResponse } from "types/responses/ProfileResponse";

export type RequestsContextType = {
  isLoading: boolean;
  profile: ProfileResponse;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setProfile: Dispatch<SetStateAction<ProfileResponse>>;
};
