export type CommentArticleRequest = {
    text: string,
    mentionedAccounts?: string,
    parentId?: number,
    file?: File,
    articleId: number
}