"use client";

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from "react";
import { getSummaryAccount } from "services/AccountService";
import { AppContextType, AppStateType } from "types/pages/AppType";

export const AppContext = createContext<AppContextType | null>(null);


const AppProvider = (props: any) => {
    const router = useRouter();
    const pathname = usePathname();
    const pathnameSplit = pathname.split('/');
    const allowedPaths = ['login', 'signup', 'gaming'];

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
            getSummaryAccount()
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