import { Dispatch, SetStateAction } from "react";
import { PageResponse } from "types/responses/PageResponse";
import { AccountWithManualFriendResponse } from "types/responses/RecommendAccountResponse";

export type RelationshipContextType = {
  isLoading: boolean;
  receiveRequestFriendship: PageResponse<AccountWithManualFriendResponse>;
  sendRequestFriendship: PageResponse<AccountWithManualFriendResponse>;
  recommendRequestFriendship: PageResponse<AccountWithManualFriendResponse>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setReceiveRequestFriendship: Dispatch<
    SetStateAction<PageResponse<AccountWithManualFriendResponse>>
  >;
  setSendRequestFriendship: Dispatch<
    SetStateAction<PageResponse<AccountWithManualFriendResponse>>
  >;
  setRecommendRequestFriendship: Dispatch<
    SetStateAction<PageResponse<AccountWithManualFriendResponse>>
  >;
};
