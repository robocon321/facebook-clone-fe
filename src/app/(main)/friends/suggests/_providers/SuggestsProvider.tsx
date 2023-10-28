"use client";

import { createContext, useEffect, useState } from "react";
import { ProfileContextType } from "../_type/SuggestsType";
import { ProfileResponse } from "types/responses/ProfileResponse";
import { notFound, useSearchParams } from "next/navigation";
import { getProfile } from "services/ProfileService";

export const ProfileContext = createContext<ProfileContextType | null>(null);

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

const ProfileProvider = (props: any) => {
    const searchParams = useSearchParams();
    const search = searchParams.get('profile_id');

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

    const value = {
        isLoading,
        profile,
        setIsLoading,
        setProfile
    }

    return (
        <ProfileContext.Provider value={value}>{props.children}</ProfileContext.Provider>
    )
}

export default ProfileProvider;