"use client";

import { createContext, useEffect, useState } from "react";
import { redirect, usePathname } from 'next/navigation'
import Loading from "components/limb/loading/loading";
import { getSummaryAccount } from "services/AccountService";
import { AccountSummaryInfoResponse } from "types/responses/AccountSummaryInfoResponseType";

type AppStateType = {
    isLoading: boolean,
    data: {
        user: AccountSummaryInfoResponse | null,
        message: string | null,
        error: string | null,
    }
}

export type AppContextType = {
    data: {
        user: AccountSummaryInfoResponse | null,
        message: string | null,
        error: string | null,
    },
    loadUser: () => void
};

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = (props: any) => {
    const pathname = usePathname();
    const pathnameSplit = pathname.split('/');
    const allowedPaths = ['login', 'signin'];

    const [state, setState] = useState<AppStateType>({
        isLoading: true,
        data: {
            user: null,
            message: null,
            error: null
        }
        
    });

    useEffect(() => {
        if (pathnameSplit.length > 1 && !allowedPaths.find((item) => item == pathnameSplit[1])) {
            loadUser();
        } else {
            setState({
                ...state,
                isLoading: false
            });
        }
    }, []);

    const loadUser = async () => {
        const token = localStorage.getItem('token');
        if(!token) {
            redirect('/login');
        } else {
            getSummaryAccount(token)
            .then(user => {
                setState({
                    isLoading: false,
                    data: {
                        user,
                        message: 'Successfully',
                        error: null
                    }
                })
            })
            .catch((error: Error) => {
                setState({
                    isLoading: false,
                    data: {
                        user: null,
                        message: null,
                        error: error.message
                    }
                })
            })
        }
    }

    const value = {
        data: state.data,
        loadUser
    }

    if(state.isLoading) {
        return <Loading />
    } else {
        return (
            <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
        )    
    }
}

export default AppProvider;