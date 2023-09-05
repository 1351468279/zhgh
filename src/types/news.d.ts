export type listData = {
    id: number,
    image: string,
    area: string,
    viewNum: number,
    tittle: string,
    content: string,
    time: string,
}
export type newsData = {
    articleId: number,
    name: string,
    data: listData[]
}
export type newsListData = newsData[]