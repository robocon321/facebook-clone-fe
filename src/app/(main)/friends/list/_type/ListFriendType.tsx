import { Dispatch, SetStateAction } from "react";
import { AccountWithManualFriendResponse } from "types/responses/RecommendAccountResponse";
import { PageResponse } from "types/responses/PageResponse";
import { ProfileResponse } from "types/responses/ProfileResponse";

export type ListFriendContextType = {
  isLoading: boolean;
  profile: ProfileResponse;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setProfile: Dispatch<SetStateAction<ProfileResponse>>;
  friendData: PageResponse<AccountWithManualFriendResponse>;
  setFriendData: Dispatch<
    SetStateAction<PageResponse<AccountWithManualFriendResponse>>
  >;
};
