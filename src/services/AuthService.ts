import { LoginRequest } from "types/requests/LoginRequest";

export const login = async (formData: LoginRequest) : Promise<string> => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/token`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const status = response.status;        
        const data = await response.text();
        localStorage.setItem('token', data);
        if(status == 200) {            
            return 'Login successfully';
        } else {
            throw new Error(data);
        }
    } catch (error) {
        throw error;
    }
};