import { AccountSummaryInfoResponse } from "types/responses/AccountSummaryInfoResponseType";

export const getSummaryAccount = async (token: string) : Promise<AccountSummaryInfoResponse> => {
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