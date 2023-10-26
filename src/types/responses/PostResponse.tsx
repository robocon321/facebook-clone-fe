export type PostResponse = {
    postId: number,
    text?: string,
    emotionId?: number,
    createTime: Date,
    modTime: Date,
    scope: string,
    account: AccountResponse,
    checkin?: CheckinResponse,
    tags?: AccountResponse[],
    images?: ImagePostResponse[],
    videos?: VideoPostResponse[],
    emotions?: EmotionPostResponse[],
    comments?: CommentPostResponse[]
}

export type EmotionPostResponse = {
    emotionId: number,
    account: AccountResponse,
    createTime: Date,
    modTime: Date,
    type: string
}

export type AccountResponse = {
    accountId: number,
    firstName: string,
    lastName: string,
    profilePictureUrl: string,
    website: string
}

export type CheckinResponse = {
    checkinId: number,
    longitude: string,
    latitude: string,
    city: string,
    country: string,
    address: string
}

export type VideoPostResponse = {
    videoId: number,
    text?: string,
    createTime: Date,
    modTime: Date,
    fileUrl: string,
}


export type ImagePostResponse = {
    imagePostId: number,
    text?: string,
    createTime: Date,
    modTime: Date,
    fileUrl: string,
    textImagePosts?: TextImagePostResponse[]
    tagImagePosts?: TagImagePostResponse[]
}

export type TextImagePostResponse = {
    textId: number,
    text: string,
    color: string,
    size: number,
    xpos: number,
    ypos: number
}

export type TagImagePostResponse = {
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

export type CommentPostResponse = {
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