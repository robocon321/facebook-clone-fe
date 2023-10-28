import { Dispatch, SetStateAction } from "react";
import { AccountResponse } from "types/responses/AccountResponse";

export type AppContextType = {
    loadUser: () => Promise<void>,
    setAppState: Dispatch<SetStateAction<AppStateType>>,
    appState: AppStateType
};

export type AppStateType = {
    isLoading: boolean,
    data: {
        user: AccountResponse | null,
        message: string | null,
        error: string | null,
    }
}