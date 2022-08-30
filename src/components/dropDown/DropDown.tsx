import React, {
    CSSProperties,
    MutableRefObject,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useMemo
} from 'react';
import { useTranslation } from 'react-i18next';
import * as style from './DropDown.style';
import * as styleH5 from './DropDown.style.h5';
import { useEffectState } from "../../hooks/useEffectState";
import Toggle from "../toggle/Toggle";
import { useDomcumentOnClick } from "../../hooks/useDomcumentOnClick";
import useWidthChange from "../../hooks/useWidthChange";
import { getEventParentElement } from "utils/tools"

export type IDropDownOption<T> = {
    text: string,
    selectText?: string,
    value: T,
    render?(text: string, value: T, selectText?: string): ReactNode,
    originData?: any
};
export type IDropDownFunc = { toggleOptions(show: boolean): void };
export interface IDropDownProps<T> {
    options: IDropDownOption<T>[],
    valStr?: string,
    keyStr?: string,
    defaultIndex?: number,
    defaultValue?: T,
    onChange(selectd: IDropDownOption<T>): void
    style?: CSSProperties
    useFirstAsDefault?: boolean
    menuStyle?: CSSProperties
    menuClassName?: string
    triggerStyle?: CSSProperties
    optionStyle?: CSSProperties
    optionItemStyle?: CSSProperties
    unstopPropagation?: boolean
    label?: string
    icon?: ReactNode
    isH5?: boolean
    color?: string
    childRef?: MutableRefObject<IDropDownFunc | undefined>
    disabled?: boolean
    disabledSplitor?: boolean
    customerRender?(selectd: IDropDownOption<T>): ReactNode
    optionBgColor?: string
    children?: ReactNode
    disabledActive?: boolean
    customerOptions?: ReactNode
}
export default function DropDown<T>(props: IDropDownProps<T>) {
    const { t } = useTranslation();
    const { isH5 } = useWidthChange();
    const { DropDownStyle, Option, OptionContainer } = isH5 ? styleH5 : style;
    const state = useEffectState({
        selected: null as (null | IDropDownOption<T>),
        showOption: false,
        calcStyle: {} as CSSProperties,
        statusColor: ""
    });
    useEffect(() => {
        if (typeof props.defaultValue !== "undefined") {
            let selected;
            props.options.some((item) => {
                if (item.value === props.defaultValue) {
                    selected = item;
                    return true;
                }
                return false;
            });
            if (selected) {
                state.selected = selected;
                return;
            }
        }
        if (props.useFirstAsDefault) {
            state.selected = props.options[props.defaultIndex ?? 0] || null;
        }
    }, [props.defaultIndex, props.defaultValue, props.options, props.useFirstAsDefault]);

    useImperativeHandle(props.childRef, () => ({
        toggleOptions: (show: boolean) => {
            state.showOption = show;
        }
    }));

    const nodeId = useMemo(() => Math.random().toString(), []);
    useDomcumentOnClick((event: { target: any; }) => {
        // @ts-ignore
        if (!event.target || !getEventParentElement(event.target, nodeId)) {
            state.showOption = false;
            state.calcStyle = {};
        }
    });

    // useEffect(() => {
    //     let include = false;
    //     props.options.some((item) => {
    //         if (item.value === state.selected?.value) {
    //             include = true;
    //             return true;
    //         }
    //         return false;
    //     });
    //     if (!include && props.useFirstAsDefault) {
    //         state.selected = props.options[props.defaultIndex ?? 0] || null
    //     }
    // }, [props.options, props.defaultIndex, props.useFirstAsDefault]);

    useEffect(() => {
        if (state.selected) {
            props.onChange(state.selected);
        }
    }, [state.selected]);

    /*useEffect(() => {
        state.statusColor = "#fff";
    }, [state.showOption]);*/

    const currentSelected = useMemo(() => {
        if (typeof state.selected?.render === "function") {
            return state.selected.render(state.selected.text, state.selected.value, state.selected.selectText);
        }
        return state.selected?.selectText || state.selected?.text;
    }, [state.selected]);

    return (
        <DropDownStyle
            id={nodeId}
            style={props.style}
            color={state.statusColor || props.color || ""}
            disabled={props.disabled}
            onClick={(event) => {
                /*if (!props.unstopPropagation) {
                    event.stopPropagation();
                }*/
                if (!props.disabled && props.options.length > 0) {
                    state.showOption = !state.showOption;
                }
            }}
        /*onMouseOver={() => {
            if (!isH5 && !props.disabled) {
                state.showOption = true;
                state.statusColor = theme.colors.baseColor;
            }
        }}
        onMouseLeave={() => {
           if (!isH5) {
               state.showOption = false;
               state.statusColor = "";
           }
        }}*/
        >
            <div className={`flex-row dropdownTrigger ${props.disabled ? 'disabled' : ''}`}
                style={props.triggerStyle}>
                <Toggle vIf={!!props.children}>
                    <>{props.children}</>
                    <div className={"flex-sb"} style={{ flex: 1, width: "100%" }}>
                        <div className={"text"}>
                            {typeof props.customerRender === "function" && state.selected
                                ? props.customerRender(state.selected)
                                : currentSelected
                            }
                        </div>
                        <div className={`icon-box flex-box ${state.showOption ? 'active' : ''}`}>
                            <Toggle vIf={typeof props.icon === "undefined" && props.options.length > 1}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1958 5.1302C12.6116 4.71416 12.2843 3.97764 11.7184 3.97764L2.26609 3.97764C1.67957 3.97764 1.37297 4.7139 1.78871 5.1302L6.5149 9.86317C6.78739 10.1363 7.18994 10.136 7.46275 9.86317L12.1958 5.1302Z" fill="#563410" />
                                </svg>
                                {props.icon}
                            </Toggle>
                        </div>
                    </div>
                </Toggle>
            </div>
            <Toggle vIf={state.showOption}>
                <OptionContainer className={props.menuClassName} style={Object.assign({}, state.calcStyle, props.menuStyle)}>
                    <Option style={props.optionStyle} optionBgColor={props.optionBgColor}>
                        {
                            props.options.map((item, index) => {
                                return <li
                                    className={`OptionItem 
                                          ${props.disabledSplitor ? 'disabledSplitor' : ''} 
                                          ${(state.selected && item.value === state.selected.value && !props.disabledActive) ? 'active' : ''}`
                                    }
                                    key={index}
                                    style={props.optionItemStyle}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        // if (isH5) {
                                        //     event.stopPropagation();
                                        // }
                                        state.selected = item;
                                        state.statusColor = "";
                                        state.showOption = false;
                                    }}>{typeof item.render === "function"
                                        ? item.render(item.text, item.value, item.selectText)
                                        : item.text}
                                </li>
                            })
                        }
                        {props.customerOptions}
                    </Option>
                </OptionContainer>
            </Toggle>
        </DropDownStyle>
    )
}
