"use client";

import { createContext, useEffect, useState } from "react";
import { ListFriendContextType } from "../_type/ListFriendType";
import { ProfileResponse } from "types/responses/ProfileResponse";
import { notFound, useSearchParams } from "next/navigation";
import { getProfile } from "services/ProfileService";
import { getAccountFriendshipAndStatus } from "services/AccountService";
import { PageResponse } from "types/responses/PageResponse";
import { AccountResponse } from "types/responses/AccountResponse";
import { AccountWithManualFriendResponse } from "types/responses/RecommendAccountResponse";

export const ListFriendContext = createContext<ListFriendContextType | null>(null);

const defaultProfile: ProfileResponse = {
    accountId: -1,
    email: '',
    phone: '',
    birthdate: new Date(),
    gender: 'MALE',
    firstName: '',
    lastName: '',
    status: 'ACTIVE'
};

const defaultFriendshipRequest: PageResponse<AccountWithManualFriendResponse> = {
    page: 0,
    size: 10,
    data: []
}

const ListFriendProvider = (props: any) => {
    const searchParams = useSearchParams();
    const search = searchParams.get('profile_id');

    useEffect(() => {
        setIsLoading(true);
        getAccountFriendshipAndStatus('ACCEPTED', '')
        .then(response => {
            setFriendData({
                ...friendData,
                data: response.data
            });
            setIsLoading(false);
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        if(search) {
            getProfile(Number.parseInt(search))
            .then(response => setProfile(response))
            .catch(error => {
                notFound();
            });
        }
    }, [search]);

    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState<ProfileResponse>(defaultProfile);
    const [friendData, setFriendData] = useState<PageResponse<AccountWithManualFriendResponse>>(defaultFriendshipRequest);


    const value = {
        isLoading,
        profile,
        setIsLoading,
        setProfile,
        friendData,
        setFriendData     
    }

    return (
        <ListFriendContext.Provider value={value}>{props.children}</ListFriendContext.Provider>
    )
}

export default ListFriendProvider;