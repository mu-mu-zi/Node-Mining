import Web3 from "web3";

export interface ISignatrua {
  origin: string
  signatrue: string
}

export async function signMsg(signObj: any, walletAddress: string, Provider: any) : Promise<ISignatrua>{
  const originData = JSON.stringify(signObj);
  /*const signature = await getWallet().signMessage(originData);
  return {origin: originData, signatrue: signature}*/

  return signString(originData, walletAddress, Provider);
}

export async function signString(str: string, address: string, Provider: any) : Promise<ISignatrua>{
  let web3Provider = new Web3(Provider);
  return new Promise((resolve, reject) => {
      web3Provider.eth.personal.sign(str, address, "", (err: any, res: any) => {
          if (!err) {
              resolve({origin: str, signatrue: res});
          } else {
              if(err.code === -32602){
                  // PubSub.publish(wallet_logout);
                  console.log(err)
              }
              reject(err);
          }
      })
  });
}
