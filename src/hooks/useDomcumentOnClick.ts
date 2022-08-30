import {useEffect} from "react";
import {useEffectState} from "./useEffectState";

export function useDomcumentOnClick(callback: (event: MouseEvent) => void) {
    const state = useEffectState({
        tradingView_status: false
    });

    useEffect(() => {
        document.addEventListener("click", domOnClick);
        return () => {
            document.removeEventListener("click", domOnClick);
        }
    }, []);

    function domOnClick(event: MouseEvent) {
        callback(event)
    }
}
