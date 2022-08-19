import { Web3ReactProvider} from "@web3-react/core";
import {useSelector} from "react-redux";
import {ReactNode} from "react";
import {
  getConnectorForWallet,
  injected,
  injectedHooks,
  network,
  useConnectors,
  walletConnect,
  walletConnectHooks
} from "./hooks";
import {Connector} from "@web3-react/types";
import {useAsync} from "react-use";
import { RootState } from "store";
// import {useAppSelector} from "../store/hooks";

const connect = async (connector: Connector) => {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`)
  }
}

export default function Web3Provider({children}: { children: ReactNode }) {
  const storeData = useSelector((state: RootState) => state.appStore);
  // const dispatch = useDispatch();
  const connectors = useConnectors(storeData.selectedWallet)

  useAsync(async () => {
    // default connect `nodeUrl()` provider
    await connect(network)
    // check selected wallet
    if (storeData.selectedWallet) {
      await connect(getConnectorForWallet(storeData.selectedWallet))
    }
  }, [])

  return <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
}