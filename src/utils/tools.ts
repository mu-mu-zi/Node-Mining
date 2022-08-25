

export function getEventParentElement(element: HTMLElement, targetId: string): HTMLElement | null {
    if (!element || element.tagName === "BODY") {
        return null;
    } else if(element.id === targetId) {
        return element
    } else {
        return getEventParentElement(element.parentElement!, targetId);
    }
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
