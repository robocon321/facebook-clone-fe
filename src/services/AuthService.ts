import { LoginRequest } from "types/requests/LoginRequest";
import { RegisterRequest } from "types/requests/RegisterRequest";

export const login = async ( formData: LoginRequest ): Promise<string> =>
{
    const response = await fetch( `${ process.env.BACKEND_URL }/auth/token`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify( formData ),
    } );
    const status = response.status;
    const data = await response.text();
    localStorage.setItem( 'token', data );
    if ( status == 200 )
    {
        return 'Login successfully';
    } else
    {
        throw new Error( data );
    }
};

export const register = async ( formData: RegisterRequest ): Promise<string> =>
{
    const response = await fetch( `${ process.env.BACKEND_URL }/auth/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify( formData ),
    } );
    const status = response.status;
    const data = await response.text();
    if ( status == 201 )
    {
        return 'Register successfully';
    } else
    {
        throw new Error( data );
    }
};