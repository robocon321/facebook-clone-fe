import { PageRequest } from "types/requests/PageRequest";
import { AccountSummaryInfoResponse } from "types/responses/AccountSummaryInfoResponseType";

export const getSummaryAccount = async () : Promise<AccountSummaryInfoResponse> => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/account/summary-info`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`           
            }
        });
        const status = response.status;        
        const data = await response.json();
        if(status == 200) {
            return data;
        } else {            
            throw new Error(data);
        }

    } catch(error) {
        throw error;
    }
}

export const getAccountFriendshipAndStatus = async (friendshipStatus: string, search: string, excludeIds: number[], pageRequest?: PageRequest) => {

    let queryParams: any = {
        status: friendshipStatus,
        search
    }

    if(excludeIds) queryParams.excludeIds = excludeIds;
    if(pageRequest) queryParams = {
        ...queryParams,
        ...pageRequest
    }

    const token = localStorage.getItem('token');
    const url = `${process.env.BACKEND_URL}/account/account-friendship`;

    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');
    const requestUrl = `${url}?${queryString}`;

    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${token}`           
            }
        });
        const status = response.status;        
        const data = await response.json();
        if(status == 200) {
            return data;
        } else {            
            throw new Error(data);
        }

    } catch(error) {
        throw error;
    }
}