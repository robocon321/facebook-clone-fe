import { AccountResponse } from "./AccountResponse"

export type AccountWithManualFriendResponse = {
    accountId: number,
    firstName: string,
    lastName: string,
    profilePictureUrl: string,
    location: string,
    website: string
    manualFriends: AccountResponse[]
}