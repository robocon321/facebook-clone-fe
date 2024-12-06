import { CommentArticleRequest } from "types/requests/CommentArticleRequest";
import { buildFormData } from "utils/FormDataUtils";

export const createComment = async ( request: CommentArticleRequest ): Promise<any> =>
{
    const token = localStorage.getItem( 'token' );

    const formData = new FormData();
    buildFormData( formData, request );

    const response = await fetch( `${ process.env.BACKEND_URL }/comment`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${ token }`
        },
        body: formData
    } );
    const status = response.status;
    if ( status == 200 )
    {
        return "Create comment successful!";
    } else
    {
        throw new Error( "Bad request" );
    }
}
