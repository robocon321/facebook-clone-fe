import { CommentArticleRequest } from "types/requests/CommentArticleRequest";
import { buildFormData } from "utils/FormDataUtils";

export const createComment = async ( request: CommentArticleRequest ): Promise<any> =>
{
    const token = localStorage.getItem( 'token' );

    const formData = new FormData();
    buildFormData( formData, request );

    const response = await fetch( `${ process.env.BACKEND_URL }/comment-article/create`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${ token }`
        },
        body: formData
    } );
    const status = response.status;
    const data = await response.json();
    if ( status == 200 )
    {
        return data;
    } else
    {
        throw new Error( data );
    }
}
