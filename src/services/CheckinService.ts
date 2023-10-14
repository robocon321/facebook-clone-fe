import { PageRequest } from "types/requests/PageRequest";
import { CheckinResponseType } from "types/responses/CheckinResponseType";

export const getCheckinLocation = async (search: string, pageRequest?: PageRequest): Promise<CheckinResponseType[]> => {

    let queryParams: any = {
        search
    }

    if(pageRequest) queryParams = {
        ...queryParams,
        ...pageRequest
    }

    const url = `${process.env.BACKEND_URL}/checkin`;

    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');
    const requestUrl = `${url}?${queryString}`;

    try {
        const response = await fetch(requestUrl, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        });
        const status = response.status;        
        const data = await response.json();
        if(status == 200) {            
            return data.data;
        } else {            
            throw new Error(data);
        }

    } catch(error) {
        throw error;
    }
}