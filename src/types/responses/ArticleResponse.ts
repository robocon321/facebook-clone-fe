import { AccountResponse } from "./AccountResponse"

export type ArticleResponse = {
    articleId: number,
    text?: string,
    emotionId?: number,
    createTime: Date,
    modTime: Date,
    scope: string,
    account: AccountResponse,
    checkin?: CheckinResponse,
    tags?: AccountResponse[],
    images?: ImageArticleResponse[],
    videos?: VideoArticleResponse[],
    emotions?: EmotionArticleResponse[],
    comments?: CommentArticleResponse[]
}

export type EmotionArticleResponse = {
    emotionId: number,
    account: AccountResponse,
    createTime: Date,
    modTime: Date,
    type: string
}

export type CheckinResponse = {
    checkinId: number,
    longitude: string,
    latitude: string,
    city: string,
    country: string,
    address: string
}

export type VideoArticleResponse = {
    videoId: number,
    text?: string,
    createTime: Date,
    modTime: Date,
    fileUrl: string,
}


export type ImageArticleResponse = {
    imageArticleId: number,
    text?: string,
    createTime: Date,
    modTime: Date,
    fileUrl: string,
    textImageArticles?: TextImageArticleResponse[]
    tagImageArticles?: TagImageArticleResponse[]
}

export type TextImageArticleResponse = {
    textId: number,
    text: string,
    color: string,
    size: number,
    xpos: number,
    ypos: number
}

export type TagImageArticleResponse = {
    tagId: number,
    account: AccountResponse,
    xpos: number,
    ypos: number
}

export type FileResponse = {
    fileId: number,
    name: string,
    type: string
}

export type CommentArticleResponse = {
    commentId: number,
    account: AccountResponse,
    text: string,
    file?: FileResponse,
    mentions?: AccountResponse[],
    parentId?: number,
    createTime: Date,
    modTime: Date,
    status: string,
    emotions: EmotionCommentResponse[]
}

export type EmotionCommentResponse = {
    emotionId: number,
    account: AccountResponse,
    createTime: Date,
    modTime: Date,
    type: string
}