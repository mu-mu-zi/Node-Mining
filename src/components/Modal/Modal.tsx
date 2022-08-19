import React, { CSSProperties, MouseEventHandler, useEffect, useMemo, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import * as style from './modal.style';
import * as styleDrawer from './drawer.style';
import { useEffectState } from "hooks/useEffectState";
import { CSSTransition } from "react-transition-group";
import Toggle from '../toggle/Toggle';


type IProps = {
    title?: React.ReactNode,
    children?: React.ReactNode
    handleClick?(): void
    onClick?: MouseEventHandler
    onClose?(): void
    disabledModalClick?: boolean
    disableHead?: boolean
    disabledClose?: boolean
    disabledBorder?: boolean
    style?: CSSProperties
    titleStyle?: CSSProperties
    containerStyle?: CSSProperties
    fullScreen?: boolean
    isH5?: boolean
    active?: boolean
    enableBodyScroll?: boolean
    type: 'modal' | 'drawer'
}
export default function Modal(props: IProps) {
    const { t } = useTranslation();
    const { ModalBox } = props.type === 'modal' ? style : styleDrawer;

    const state = useEffectState({
        active: false,
        touchStart: 0
    });

    useEffect(() => {
        let cssText = '';
        if (props.isH5 && !props.enableBodyScroll) {
            document.body.style.cssText = "overflow: hidden;"
        }
        return () => {
            document.body.style.cssText = cssText;
        }
    }, [props.isH5]);

    useEffect(() => {
        if (typeof props.active === "boolean") {
            state.active = props.active;
            if (!props.active && !props.isH5 && typeof props.onClose === "function") {
                props.onClose();
            }
        } else {
            state.active = true;
        }
    }, [props.active, props.isH5]);

    const boxStyle = useMemo(() => {
        let style = props.fullScreen ? { overflow: "auto" } : {};
        return Object.assign({}, style, props.containerStyle);
    }, [props.fullScreen, props.containerStyle]);

    const titleStyle = useMemo(() => {
        let baseStyle = props.isH5 ? { marginBottom: "24px" } : {};
        return Object.assign({}, baseStyle, props.titleStyle);
    }, [props.isH5, props.titleStyle]);

    function handleClick(event: React.MouseEvent) {
        if (!props.disabledModalClick) {
            // @ts-ignore
            let targetId = event.target.id;
            let target:any = event.target
            // if (!props.isH5 && targetId === "modal" && typeof props.onClose === "function") {
            //     props.onClose();
            // }
            let cDom = document.getElementById("modal") || document.body;
            if(cDom.contains(target)) {
                console.log(1)
            } else {
                console.log(2)

            }
            
            if (!props.isH5 && targetId === "modal" && typeof props.onClose === "function") {
                props.onClose();
            }
            // @ts-ignore
            if (props.isH5 && !getEventParentElement(event.target, "modal_content")) {
                state.active = false;
            }
        }
    }
    const MouseClick = (event:any) => {
        if (!props.disabledModalClick) {
            // @ts-ignore
            let target:any = event.target
            let cDom = document.getElementById("modal") || document.body;
            if(!cDom.contains(target) && typeof props.onClose === "function" ) {
                props.onClose()
              
            }
        }
    }
    useEffect(() => {
        setTimeout(() => {
            document.addEventListener("click", MouseClick);
        },100)

        return(() => {
            window.removeEventListener("click",MouseClick)
        })
    },[])
  

    /*Drag the mouse*/
    function onTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
        /*const touchEnd = event.changedTouches[0].clientY;
        if (state.touchStart && touchEnd && touchEnd - state.touchStart > 100) {
            state.active = false;
        }
        state.touchStart = 0;*/
    }

    return (
        <ModalBox
            style={boxStyle}
            id={"modal"}
            onClick={handleClick}>
            <CSSTransition
                in={state.active}
                timeout={200}
                classNames={props.isH5 ? "my-slider-up" : ""}
                unmountOnExit
                onExited={() => {
                    if (props.isH5 && typeof props.onClose === "function") {
                        props.onClose();
                    }
                }}>
                <div className={`modal_content_box`}
                    style={props.style}
                    onTouchStart={(event) => {
                        state.touchStart = event.touches[0].clientY;
                    }}
                    onTouchEnd={onTouchEnd}
                    onClick={(event) => {
                        // event.stopPropagation();
                        // @ts-ignore
                        if (props.isH5 && !getEventParentElement(event.target, "modal_content")) {
                            state.active = false;
                        }
                        props.onClick && props.onClick(event);
                    }}>
                    {
                        props.isH5
                            ? null
                            : <Toggle vIf={!!props.isH5 && !props.disabledBorder}>
                                {/* <Border /> */}
                            </Toggle>
                    }
                    {/* {
                        (props.isH5 || props.disabledClose)
                            ? null
                            : <div className={"close"}
                                onClick={props.onClose}>
                                <img src={require("src/assets/images/icon_close.png")} className={"closeIcon"} alt="" />
                            </div>
                    } */}
                    {
                        props.disableHead
                        ? <h1 className="modal-title" style={titleStyle}>{props.title}</h1>
                            : null
                    }
                    <div className={"modal_content"} id={"modal_content"}>
                        {props.children}
                    </div>
                </div>
            </CSSTransition>
        </ModalBox>
    )
}
