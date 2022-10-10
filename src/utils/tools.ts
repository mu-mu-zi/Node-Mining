import OpenMessageBox, { MsgStatus } from "components/messageBox/MessageBox";
import { NUMBER_REG, INT_REG, INPUT_NUMBER_REG, FLOAT_NUMBER } from "./global";
import moment from "moment";
import { ReactNode } from 'react'

export function getEventParentElement(element: HTMLElement, targetId: string): HTMLElement | null {
    if (!element || element.tagName === "BODY") {
        return null;
    } else if(element.id === targetId) {
        return element
    } else {
        return getEventParentElement(element.parentElement!, targetId);
    }
}

export function Notice(msg: string,  type?: MsgStatus, params: any = {}, node?: ReactNode) {
    //alert(msg);
    //Toast(msg);
    OpenMessageBox({
        title: msg,
        content: node,
        subtitle: params.subtitle || "",
        type: type ?? MsgStatus.warn
    })
}

//async await Error Handling
export function awaitWrap<T>(promise: Promise<T>) {
    return promise
        .then((data:T) => [data, null])
        .catch(err => [null, err])
}

//Parameter conversion processing
export function stringify(obj:any) {
    let str = "";
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            str += i + '=' + unescape(obj[i]) + '&'
        }
    }
    return str.slice(0, -1);
}

/*Verify email*/
export function isEmail(email:string) {
    return /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/g.test(email);
}

/*Formatted Address*/
export function formatAddress(address: string, start = 6, end = 4) {
    if (!address) {
        return "";
    }
    let reg = new RegExp(`(.{${start}}).+(.{${end}}$)`, "g");
    return address.replace(reg, "$1...$2")
}

export function filterBanner(result: any[], num: number) {
    let arr = result.filter((item) => {
        return item.bannerLocation === num
    })
    arr.sort((a, b) => {
        return a.weights - b.weights
    })
    console.log(arr)
    let banners: { image: string }[] = []
    arr.forEach(item => {
        banners.push({
            image: item.imageUrl
        })
    })
    return banners
}

export function isNumber(str: string) {
    return new RegExp(NUMBER_REG, "gi").test(str);
}
export function isIntNumber(str: string) {
    return new RegExp(INT_REG, "gi").test(str);
}
export function isInputNumber(str: string) {
    return new RegExp(INPUT_NUMBER_REG, "gi").test(str);
}
export function isFloatNumber(str: string) {
    return new RegExp(FLOAT_NUMBER, "gi").test(str);
}
export function isEmptyObject(data: Object) {
    return !data || Object.keys(data).length === 0;
}

export function TimestampTransform(date: number) {
    return moment(date).parseZone().format('YYYY-MM-DD HH:mm:ss')
}

