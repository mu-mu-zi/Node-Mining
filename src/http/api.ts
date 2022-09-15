import { fetchPost, fetchGet } from "./index";
import { AppDispatch } from '../store/index';


interface PageType {
  pageIndex: number,
  pageSize: number
}

interface Nonce {
  address: string
  nonce: string
}

export function generateNonce(address: string) {
  return fetchPost<Nonce>('/api/v1/user/generateNonce', { address })
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

export interface Banners {
  introduction: string,
  id: number,
  bannerName: string,
  bannerLocation: number,
  imageUrl: string,
  status: number,
  weights: number,
  language: string,
  starTime: string,
  endTime: string,
  createTime: string,
  updateTime:string ,
}

export function getBanners() {
  return fetchPost<Banners[]>('/api/v1/banner/banners',{
    pageIndex: 1,
    pageSize: 999
  })
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

export interface MyAsset {
  totalAsset: number,
  available: number,
}

export function myAsset() {
  return fetchGet<MyAsset>('/api/v1/asset/myAsset')
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
  pageIndex: number
  pageSize: number
  records: Records[]
  total: number
}

export type Records = {
  amount: number,
  symbol: string,
  createTime: number,
}

export function incomeRecords(data: PageType) {
  return fetchPost<IncomeRecords>('/api/v1/record/incomeRecords', {
    pageIndex: data.pageIndex,
    pageSize: data.pageSize
  })
}

export interface Award {
  total: number
  records: AwardRecords[],
  pageIndex: number
  pageSize: number
}

export type AwardRecords = {
  userId: number
  inviteesAddr: string
  award: number
  symbol: string
  createTime: number
}

export function award(data: PageType) {
  return fetchPost<Award>('/api/v1/record/award', {
    pageIndex: data.pageIndex,
    pageSize: data.pageSize
  })
}


export function apply(data: { coinId: number, amount: number }) {
  return fetchPost<boolean>('/api/v1/withdraw/apply', {
    coinId: data.coinId,
    amount: data.amount
  })
}

export interface CoinList {
  id: number
  symbol: string
  name: string
  image: string
  settleDecimal: number
  withdrawFee: number
  availableAmount: number
  totalAmount: number
}

export function coinList() {
  return fetchPost<CoinList[]>('/api/v1/withdraw/coinList', {})
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

export interface WithdrawList {
  total: number
  records: WithdrawRecords[]
  pageIndex: number
  pageSize: 0
}

export function withdrawList(data: PageType) {
  return fetchPost<WithdrawList>('/api/v1/withdraw/list', {
    pageIndex: data.pageIndex,
    pageSize: data.pageSize
  })
}

export type NodeListRecords = {
  "id": number
  "tokenId": number
  "apiKey": string
  "price": number
  "coinId": number
  "createTime": string
  "coinName": string
}

export interface NodeList {
  "total": number
  "records": NodeListRecords[]
  "pageIndex": number
  "pageSize": number
}

export function nodeList(data: PageType) {
  return fetchPost<NodeList>('/api/v1/node/list', {
    pageIndex: data.pageIndex,
    pageSize: data.pageSize
  })
}

export interface GetNodeKey {
  apiKey: string,
  apiSecret: string
}

export function getNodeKey(nodeId: number) {
  return fetchPost<GetNodeKey>('/api/v1/node/getApiInfo', { nodeId }
  )
}
export interface GenerateNodeKey {
  apiKey: string,
  apiSecret: string
}

export function generateNodeKey(data: {
  originalData: any,
  signature: string
}) {
  return fetchPost<GenerateNodeKey>('/api/v1/node/generateNodeApiKey', {
    "originalData": data.originalData,
    "signature": data.signature
  }
  )
}

export interface PushRewardInfo {
  totalIncome:number
  usdtTotalIncome:number
  todayIncome:number
  usdtTodayIncome: number
}

export function pushRewardInfo() {
  return fetchPost<PushRewardInfo>('/api/v1/record/pushRewardInfo', {

  })
}
export interface TotalNodes {
  globalNode:number
  runNode:number
  total:number
  efficientNode: number
}

export function totalNodes() {
  return fetchPost<TotalNodes>('/api/v1/node/nodes')
}

export function submitEmail(email:string) {
  return fetchPost<boolean>('/api/v1/email/submitEmail',{
    email
  })
}
