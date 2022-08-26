import { fetchPost, fetchGet } from "./index";

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
