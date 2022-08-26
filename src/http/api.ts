import { fetchPost, fetchGet } from "./index";


interface PageType {
	pageIndex: number,
	pageSize: number
}

interface Nonce {
  address: string
  nonce: string
}

export function generateNonce(address: string) {
  return fetchPost<Nonce>('/api/v1/user/generateNonce',{address})
}

interface LoginApi {
  userId: number
  address: string
  token: string
}

export function loginApi(data: { address: string; signature: string; }) {
  return fetchPost<LoginApi>('/api/v1/user/token', {
    address: data.address,
	  signature: data.signature
  })
}
export interface Earnings {
  ustdTotalFunds: number,
  ustdAvailableAmount: number,
  ustdfreezeAmount: number,
  getaTotalFunds: number,
  getaAvailableAmount: number,
  getafreezeAmount: number
}

export function earnings() {
  return fetchGet<Earnings>('/api/v1/asset/myEarnings') 
}

export interface MyNode {
  myNode: number,
  income: number,

}

export function myNode() {
  return fetchGet<MyNode>('/api/v1/asset/myNode') 
}

export interface Revenue {
  countIncome: number,
  todayCentsIncome: number,
  nodeNumber: number,
}

export function nodeRevenue() {
  return fetchPost<Revenue>('/api/v1/record/nodeRevenue', {

  })
}

export interface IncomeRecords {
  countIncome: number,
  todayCentsIncome: number,
  nodeNumber: number,
}

export function incomeRecords(data:PageType) {
  return fetchPost<IncomeRecords>('/api/v1/record/incomeRecords', {
    pageIndex: data.pageIndex,
    pageSize: data.pageSize
  })
}

export interface Award {
  total: number
  records: [
    {
      userId: number
      inviteesAddr: string
      award: number
      symbol: string
      createTime: number
    }
  ],
  pageIndex: number
  pageSize: number
}

export function award(data:PageType) {
  return fetchPost<Award>('/api/v1/record/award', {
    pageIndex: data.pageIndex,
    pageSize: data.pageSize
  })
}


export function apply(data:{coinId:number,amount:number}) {
  return fetchPost<boolean>('/api/v1/withdraw/apply', {
    coinId: data.coinId,
    amount: data.amount
  })
}

interface CoinList 	{
  id: number
  symbol: string
  name: string
  image: string
  settleDecimal: number
  withdrawFee: number
}

export function coinList() {
  return fetchPost<CoinList>('/api/v1/withdraw/coinList', {})
}

export type WithdrawRecords = {
  id: number,
  userId: number,
  coinId: number,
  coinName: string,
  amount: number,
  feeAmount: number,
  hash: string,
  stats: number,
  networkId: number,
  desc: string,
  createTime: string,
  updateTime: string,
}

export interface WithdrawList 	{
  total: number
  records: WithdrawRecords[]
  pageIndex: number
  pageSize: 0
}

export function withdrawList(data:PageType) {
  return fetchPost<WithdrawList>('/api/v1/withdraw/list', {
    pageIndex: data.pageIndex,
    pageSize: data.pageSize
  })
}

