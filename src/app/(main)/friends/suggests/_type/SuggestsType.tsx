import { Dispatch, SetStateAction } from "react";
import { ProfileResponse } from "types/responses/ProfileResponse";

export type ProfileContextType = {    
    isLoading: boolean,
    profile: ProfileResponse,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setProfile: Dispatch<SetStateAction<ProfileResponse>>
};