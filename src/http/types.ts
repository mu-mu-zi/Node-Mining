export default interface IPost<R = any> {
    code: number
    data: R
    message: string
    success: boolean
}

export type IResArr<R = any> = {
    pageNo: number
    pageSize: number
    records: R[]
    total: number
}

