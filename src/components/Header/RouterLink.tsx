import React, {ReactNode} from 'react';
import { NavLink } from 'react-router-dom';

type IRouterProps = {
    to: string
    children?: ReactNode
    className?: string | ((props: {
        isActive: boolean;
    }) => string | undefined);
    style?: React.CSSProperties | ((props: {
        isActive: boolean;
    }) => React.CSSProperties);
    onClick?(): void
}
export default function RouterLink(props: IRouterProps) {

    return (
        <NavLink {...props}>{props.children}</NavLink>
    )
}
