import { FriendshipRequest } from "types/requests/FriendshipRequest";
import { FriendshipResponse } from "types/responses/FriendshipResponse";

export const changeFriendship = async ( request: FriendshipRequest ): Promise<FriendshipResponse> =>
{
    const token = localStorage.getItem( 'token' );
    const response = await fetch( `${ process.env.BACKEND_URL }/friendship/create`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify( request )
    } );
    const status = response.status;
    const data = await response.json();
    if ( status == 201 )
    {
        return data;
    } else
    {
        throw new Error( data );
    }
}
