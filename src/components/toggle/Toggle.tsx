import React, {ReactNode, useMemo} from 'react';

type IProps = {
    children: ReactNode
    vIf?: boolean
    active?: number
}
export default function Toggle(props: IProps) {

    const element = useMemo(() => {
        let match = false;
        let element = null;
        React.Children.forEach( props.children ,(item: any, index) => {
            if (match) {
                return;
            }
            if (typeof props.active === "number") {
                if (props.active === index) {
                    match = true;
                    element = item;
                }
            } else {
                if (props.vIf && index === 0) {
                    match = true;
                    element = item;
                } else if(!props.vIf && index === 1) {
                    match = true;
                    element = item;
                }
            }
        });
        return element;
    }, [props.vIf, props.children, props.active]);

    return <>
        {element ? React.cloneElement(element) : null }
    </>
}
