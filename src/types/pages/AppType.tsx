import { Dispatch, SetStateAction } from "react";
import { AccountSummaryInfoResponse } from "types/responses/AccountSummaryInfoResponseType";

export type AppContextType = {
    loadUser: () => Promise<void>,
    setAppState: Dispatch<SetStateAction<AppStateType>>,
    appState: AppStateType
};

export type AppStateType = {
    isLoading: boolean,
    data: {
        user: AccountSummaryInfoResponse | null,
        message: string | null,
        error: string | null,
    }
}