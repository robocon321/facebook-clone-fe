"use client";

import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { redirect, usePathname } from 'next/navigation';
import Loading from "components/limb/loading/Loading";
import { getSummaryAccount } from "services/AccountService";
import { AccountSummaryInfoResponse } from "types/responses/AccountSummaryInfoResponseType";
import { useRouter } from 'next/navigation';

type AppStateType = {
    isLoading: boolean,
    data: {
        user: AccountSummaryInfoResponse | null,
        message: string | null,
        error: string | null,
    }
}

export type AppContextType = {
    loadUser: () => Promise<void>,
    setAppState: Dispatch<SetStateAction<AppStateType>>,
    appState: AppStateType
};

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = (props: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const pathnameSplit = pathname.split('/');
    const allowedPaths = ['login', 'signup'];

    const [appState, setAppState] = useState<AppStateType>({
        isLoading: true,
        data: {
            user: null,
            message: null,
            error: null
        }

    });

    useEffect(() => {
        !allowedPaths.find((item) => {
            return item == pathnameSplit[1]
        });
        if (pathnameSplit.length > 1 && !allowedPaths.find((item) => item == pathnameSplit[1])) {
            loadUser();
        } else {
            setAppState({
                ...appState,
                isLoading: false
            });
        }
    }, []);

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            getSummaryAccount(token)
                .then(user => {
                    setAppState({
                        isLoading: false,
                        data: {
                            user,
                            message: 'Successfully',
                            error: null
                        }
                    })
                })
                .catch((error: Error) => {
                    setAppState({
                        isLoading: false,
                        data: {
                            user: null,
                            message: null,
                            error: error.message
                        }
                    })
                    router.push('/login');
                })
        }
    }

    const value = {
        loadUser,
        setAppState,
        appState
    }

    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    )
}

export default AppProvider;