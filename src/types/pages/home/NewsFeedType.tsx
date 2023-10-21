import { Dispatch, SetStateAction } from "react"

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
    emotions?: EmotionPostType[]
}

export type EmotionPostType = {
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

export type NewsFeedContextType = {
    newsFeedData: DataStateType,
    setNewsFeedData: Dispatch<SetStateAction<DataStateType>>,
    newsFeedControl: ControlStateType,
    setNewsFeedControl: Dispatch<SetStateAction<ControlStateType>>,
    newsFeedEmotions: EmotionType[],
    setNewsFeedPost: (post: PostResponse) => void
};

export type DataStateType = {
    posts: PostResponse[]
}

export type ControlStateType = {
    page: number
}

export type EmotionType = {
    emotion_id: number,
    text: string,
    imageUrl: string
  }