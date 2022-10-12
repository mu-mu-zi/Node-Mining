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

export const service_api = process.env.NODE_ENV === "production" ? "https://getaverses.com" : "https://getaverses.com";

export const EmptyStr = "--";

export const _group = "getaverse";

export const Decimals = 18;

export const ETHDecimals = 6;

export const zeroAddress = "0x0000000000000000000000000000000000000000";

// export const adminAddress = "0x7557f9C2520B08F305100Cd24529fEf8429A1B97"
// export const adminAddress = "0xFff33d9777BB27Cc5D74922394BFB51f5C8Fe846";
export const adminAddress = "0xDffa8f599Fd19D88C76D509eD346Ef8Fb7DC90d1";

export const decimalPlaces = 6;

/*Verify if digital*/
export const NUMBER_REG = "^[\\+-]?\\d+(\\.{1}\\d+)?$";
/*Verify integer*/
export const INT_REG = "^\\d+$";

export const INPUT_NUMBER_REG = "^\\d*(\\.{1}\\d*)?$";

export const DECIMAL_NUMBER = "^[\\+-]?\\d+(\\.{1}\\d*)?$";

export const FLOAT_NUMBER = "^[1-9]\\d*\\.?\\d*)|(0\\.\\d*[1-9]?$";
