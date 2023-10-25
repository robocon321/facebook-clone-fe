export type CommentPostRequest = {
    text: string,
    mentionedAccounts?: string,
    parentId?: number,
    file?: File,
    postId: number
}