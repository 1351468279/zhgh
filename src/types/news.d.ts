export type listData = {
    id: number,
    image: string,
    area: string,
    viewNum: number,
    content: string
}
export type newsData = {
    id: number,
    name: string,
    data: listData[]
}
export type newsListData = newsData[]