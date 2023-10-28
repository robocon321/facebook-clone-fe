export type PageResponse<T> = {
    page: number,
    size: number,
    data: T[]
}