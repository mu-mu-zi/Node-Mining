export const Z_INDEX = {
  modal: 10000,
  fixed_links: 9000,
  header_nav: 8000,
  banner_text: 1001,
  banner: 1000,
  index_vision: 100,
}

export const nodeUrl = () => {
  return `https://mainnet.infura.io/v3/7d0afe54dc294b0685539de9451894a2`
}

export const service_api = process.env.NODE_ENV === "production" ? "http://13.215.206.153:8100/" : "http://13.215.206.153:8100/";

export const EmptyStr = "--" 
