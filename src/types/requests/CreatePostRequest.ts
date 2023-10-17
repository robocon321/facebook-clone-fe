export type CreatePostRequest = {
    text?: string,
    images?: ImageType[],
    videos?: VideoType[],
    tags?: number[],
    emotion?: number,
    checkin?: number,
    scope: string
}

export type VideoType = {
    file: File,
    note?: string,
    createTime: Date
  }

export type ImageType = {
    file: File,
    tags?: TagImageType[],
    note?: string,
    texts?: TextImageType[],
    createTime: Date
}

type TextImageType = {
    text: string,
    color: string,
    xPos: number,
    yPos: number,
    size: number  
}

type TagImageType = {
    accountId: any,
    xPos: number,
    yPos: number  
}