import { Dispatch, SetStateAction } from "react";
import { AccountResponse } from "types/responses/AccountResponse";

export type AppContextType = {
    loadUser: () => Promise<void>,
    setAppState: Dispatch<SetStateAction<AppStateType>>,
    appState: AppStateType,
    accountHistories: AccountHistoryResponse[]
};

export type AppStateType = {
    isLoading: boolean,
    data: {
        user: AccountResponse | null,
        message: string | null,
        error: string | null,
    }
}

export type HistoryResponse = {
    historyId: number,
    actionTime: Date,
    deviceInfo: string,
    status: string
}

export type AccountHistoryResponse = {
    account: AccountResponse,
    currentHistory: HistoryResponse
}