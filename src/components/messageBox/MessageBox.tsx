import React, { CSSProperties, ReactNode, useEffect } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import * as style from './MessageBox.style';
import * as styleH5 from './MessageBox.style.h5';
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useEffectState } from "hooks/useEffectState";
import Toggle from "../toggle/Toggle";
import useWidthChange from 'hooks/useWidthChange';

const success_icon = require("assets/images/success.png");
const fail_icon = require("assets/svg/fail_icon.svg").default;
const warn_icon = require("assets/svg/warn_icon.svg").default;
const loading_icon = require("assets/svg/loading_icon.svg").default;
const icons = [success_icon, fail_icon, warn_icon, loading_icon];

export enum MsgStatus {
    success,
    fail,
    warn,
    loading
}

interface IParams {
    title: string
    subtitle?: string
    content?: ReactNode
    type?: MsgStatus
    displayBtn?: boolean
    confirmText?: string
    cancelText?: string
    callback?(): void
    onConfirm?(): void
    titleStyle?: CSSProperties
}

interface IMessageBox extends IParams {
    className?: string,
    style?: CSSProperties,
    destoryComponent(): void
}
function MessageBox(props: IMessageBox) {
    const { t } = useTranslation();
    const {isH5} = useWidthChange();
    const { MessageBoxStyle } = isH5 ? styleH5 : style;
    const state = useEffectState({
        active: false
    });

    useEffect(() => {
        state.active = true;
    }, []);

    useEffect(() => {
        setTimeout(() => {
            state.active = false;
        }, props.type === MsgStatus.loading ? 300 * 1000 : 3 * 1000);
    }, []);

    return (
        <CSSTransition in={state.active} timeout={200} classNames={"my-slider-left"} unmountOnExit onExited={() => {
            props.destoryComponent();
        }}>
            <MessageBoxStyle>
                <h3 className={`flex-row title ${props.type === MsgStatus.loading ? 'loading' : ''} `} style={props.titleStyle}>
                    <img src={props.type ? icons[props.type] : icons[MsgStatus.success]} className={"icon"} alt="" />
                        { props.type === MsgStatus.loading ? <div className='text' style={{fontFamily: "RomicStd"}}>Loading...</div> : null}
                    <div>{props.title}</div>
                </h3>
                <Toggle vIf={!!props.subtitle}>
                    <h4 className="subtitle">{props.subtitle}</h4>
                </Toggle>
                {
                    props.content
                        ? <div className={"content"}>
                            {props.content}
                        </div>
                        : null
                }
            </MessageBoxStyle>
        </CSSTransition>
    )
}

const WrapMessageBox = withTranslation()(MessageBox);

export default function OpenMessageBox(params: IParams) {
    let className = "message-box";
    let messageBox = document.createElement("div");
    messageBox.className = className;
    document.body.appendChild(messageBox);
    // document.getElementById("messageContainer")!.appendChild(messageBox);
    const destoryComponent = () => {
        if (messageBox) {
            ReactDOM.unmountComponentAtNode(messageBox);
            document.body.removeChild(messageBox);
        }
    };
    ReactDOM.render(


        <WrapMessageBox destoryComponent={destoryComponent} {...params}></WrapMessageBox>
        , messageBox);
}

export function CloseMessageBox() {

    let className = "message-box";
    let messageBox = document.getElementsByClassName(className)

    if(messageBox[0]) {
        ReactDOM.unmountComponentAtNode(messageBox[0]);
        document.body.removeChild(messageBox[0]);
    }
}
