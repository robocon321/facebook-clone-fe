"use client";

import { notFound, useSearchParams } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import { getProfile } from "services/ProfileService";
import { ProfileResponse } from "types/responses/ProfileResponse";
import { RequestsContextType } from "../_type/RequestsType";

export const RequestsContext = createContext<RequestsContextType | null>(null);

const defaultProfile: ProfileResponse = {
  accountId: -1,
  email: "",
  phone: "",
  birthdate: new Date(),
  gender: "MALE",
  firstName: "",
  lastName: "",
  status: "ACTIVE",
};

const RequestsProvider = (props: any) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("profile_id");

  useEffect(() => {
    if (search) {
      getProfile(Number.parseInt(search))
        .then((response) => setProfile(response))
        .catch((error) => {
          notFound();
        });
    }
  }, [search]);

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileResponse>(defaultProfile);

  const value = useMemo(
    () => ({
      isLoading,
      profile,
      setIsLoading,
      setProfile,
    }),
    [isLoading, profile]
  );

  return (
    <RequestsContext.Provider value={value}>
      {props.children}
    </RequestsContext.Provider>
  );
};

export default RequestsProvider;
