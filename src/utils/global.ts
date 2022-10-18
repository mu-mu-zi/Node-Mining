export const Z_INDEX = {
  toast: 10001,
  modal: 10000,
  
  fixed_links: 9000,
  header_nav: 8000,
  footer_nav: 8000,
  banner_text: 1001,
  banner: 1000,
  index_vision: 100,
}

export const nodeUrl = () => {
  return `https://mainnet.infura.io/v3/7d0afe54dc294b0685539de9451894a2`
}
// switch of test/main
export const isMain = false

export const service_api = process.env.NODE_ENV === "production" ? "https://getaverses.com" : "https://getaverses.com";

export const EmptyStr = "--";

export const _group = "getaverse";

export const Decimals = 18;

export const ETHDecimals = 6;

export const zeroAddress = "0x0000000000000000000000000000000000000000";

export const adminAddress = isMain ? "0x7557f9C2520B08F305100Cd24529fEf8429A1B97" : "0xFff33d9777BB27Cc5D74922394BFB51f5C8Fe846"

export const decimalPlaces = 6;

export const CHAIN_NODE = "https://data-seed-prebsc-1-s1.binance.org:8545/";

export const PAIR_NAME = 'GEAT_USDT_Pair';

/*Verify if digital*/
export const NUMBER_REG = "^[\\+-]?\\d+(\\.{1}\\d+)?$";
/*Verify integer*/
export const INT_REG = "^\\d+$";

export const INPUT_NUMBER_REG = "^\\d*(\\.{1}\\d*)?$";
export const INPUT_NUMBER_REG_SIX = "^\\d*(\\.{1}\\d{0,6})?$"

export const DECIMAL_NUMBER = "^[\\+-]?\\d+(\\.{1}\\d*)?$";

export const FLOAT_NUMBER = "^[1-9]\\d*\\.?\\d*)|(0\\.\\d*[1-9]?$";
