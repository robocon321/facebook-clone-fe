export const getProfile = async (profileId: number) => {

    let queryParams: any = {
        profileId
    }

    const token = localStorage.getItem('token');
    const url = `${process.env.BACKEND_URL}/profile`;

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