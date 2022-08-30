import React, {
    ChangeEvent,
    createContext,
    CSSProperties,
    InputHTMLAttributes
} from 'react';
import { InputBox } from './input.style';
import {WithTranslation, withTranslation} from 'react-i18next';

type myInput = Exclude<keyof InputHTMLAttributes<HTMLInputElement>, "onChange">;
export interface IdefalutProps extends Pick<InputHTMLAttributes<HTMLInputElement>, myInput>{
    regex?: Array<{regStr:string, tips: string}>,
    hideTips?: boolean,
    label?: string,
    style?: CSSProperties,
    inputStyle?:CSSProperties,
    inputClassName?: string,
    right?: JSX.Element,
    left?: JSX.Element,
    simpleBorder?:boolean,
    value?:string | number,
    min?:number,
    minText?: string,
    max?:number,
    maxText?: string,
    maxDecimal?: number,
    onChange?(value:string, params?:any):void
}

export interface inputProps extends IdefalutProps, WithTranslation{

}
interface inputState {
    value: string | undefined | number,
    offsetLeft:number,
    validErr:boolean,
    errText: string,
    placeholder: string
}
interface IContext {
    onChange: (value:string) => {},
    required?: boolean
}

export const InputContext = createContext<IContext>({} as IContext);

class Input extends React.Component<inputProps, inputState>{
    rootNode: React.RefObject<HTMLDivElement> = React.createRef();
    inputNode: React.RefObject<HTMLInputElement> = React.createRef();
    // static contextType = InputContext;
    constructor(props:inputProps) {
        super(props);
        this.state = {
            value: props.value || "",
            offsetLeft: 0,
            validErr: false,
            errText: props.t(`Invalid values`),
            placeholder: props.placeholder || ""
        }
    }

    componentDidMount(): void {
        this.bindEvent();
        this.setState({offsetLeft: this.inputNode.current!.offsetLeft});
    }
    componentWillUnmount(): void {
        //this.inputNode.current!.removeEventListener("focus", this.handle);
        this.inputNode.current!.removeEventListener("blur", this.handle);
    }
    componentDidUpdate(prevProps: Readonly<inputProps>, prevState: Readonly<inputState>, snapshot?: any): void {
        if (prevProps.value !== this.props.value && typeof this.props.value !== "undefined" && !this.validMaxDecimal(this.props.value)) {
            this.setState({value: String(this.props.value)}, () => {
                if (this.state.validErr) {
                    this.handle();
                }
            });
        }
        if (prevProps.placeholder !== this.props.placeholder) {
            this.setState({
                placeholder: this.props.placeholder || ""
            })
        }
        if (this.state.value && (prevProps.min !== this.props.min || prevProps.max !== this.props.max)) {
            this.handle();
        }
    }

    bindEvent(): void {
        //this.inputNode.current!.addEventListener("focus", this.handle);
        this.inputNode.current!.addEventListener("blur", this.handle);
    }
    handle = (): void => {
        let el = this.inputNode.current!;
        let $root = this.rootNode.current!;
        /*if (!el.value && el.getAttribute("required")) {
            $root.classList.add("empty");
        } else {
            $root.classList.remove("empty");
        }*/
        if (!el || !$root) {
            return;
        }
        let isError = false;
        if (el.required && !el.value) {
            this.setState({validErr:true,errText: this.props.t(`This field is required`)});
            isError = true;
        } else if (this.props.min && Number(el.value) < this.props.min) {
            let warnText = this.props.minText || (this.props.t(`Minimum value`) + `：${this.props.min}`);
            this.setState({validErr:true,errText: warnText});
            isError = true;
        } else if (this.props.max && Number(el.value) > this.props.max) {
            let warnText = this.props.maxText || (this.props.t(`Exceeds maximum`) + `：${this.props.max}`);
            this.setState({validErr:true,errText: warnText});
            isError = true;
        } else if (this.props.regex) {
            this.props.regex.some((item:any) => {
                if (el.value && !new RegExp(item.regStr, 'g').test(el.value)) {
                    //$root.classList.add('inputWarn');
                    el.setAttribute('vError', "true");
                    if (!this.props.hideTips) {
                        //this.appendWarn(el, item.tips);
                        this.setState({validErr:true,errText: item.tips});
                    }
                    isError = true;
                }
                return isError;
            });
        }

        if (isError) {
            el.setAttribute('vError', "true");
            $root.classList.add('inputWarn');
        } else {
            $root.classList.remove('inputWarn');
            el.removeAttribute("vError");
            this.setState({validErr:false});
        }
    };
    appendWarn(el: HTMLElement, text:string) {
        let warnBox:HTMLElement | null = this.getWarnChild(el.parentElement);
        if (!warnBox && el.parentElement) {
            let elOffset = el.getBoundingClientRect();
            let parentOffset = el.parentElement.getBoundingClientRect();
            warnBox = document.createElement('p');
            warnBox.className = 'intpuWarn';
            warnBox.style.left = (elOffset.left - parentOffset.left) + 'px';
            warnBox.style.top = (elOffset.top - parentOffset.top + el.offsetHeight + 5) + 'px';
            el.parentElement.appendChild(warnBox);
        }
        if (warnBox) {
            warnBox.innerHTML = text;
        }
    }
    getWarnChild(parent:HTMLElement | null) {
        let child = null;
        if (parent && parent.children) {
            Array.from(parent.children).forEach(function(item){
                if (item.className.includes("intpuWarn")) {
                    child = item;
                }
            });
        }
        return child;
    }

    changeState(event: ChangeEvent<HTMLInputElement>): void {
        let val = event.target.value;
        if (!this.validMaxDecimal(val) ) {
            return;
        }
        /*if (typeof this.context.onChange === 'function') {
            this.context.onChange(val.trim());
        }*/
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(val.trim());
        }
        this.handle();
    }

    validMaxDecimal(val: string | number) {
        if(typeof val === 'number') return
        let arr = val.split(".");
        if (this.props.maxDecimal && (arr[1] && arr[1].length > this.props.maxDecimal) ) {
            return false;
        } else {
            return true;
        }
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const simpleBorderStyle = {
            border: "none",
            borderBottom: "1px solid #f5f5f5"
        };
        const { simpleBorder,tReady, maxDecimal, inputStyle, t,value, className,hideTips, placeholder, inputClassName, ...rest } = this.props;
        const boxStyle = simpleBorder?Object.assign({},simpleBorderStyle,this.props.style):this.props.style;
        return (
            <InputBox className={`flex-sb ${className}`} ref={this.rootNode} style={boxStyle}>
                <div className={"input-content"}>
                    <div className={`flex-row`} style={{flex: "1", height: "100%"}}>
                        {
                            this.props.label?(
                                <span className={'label'}>{this.props.label}</span>
                            ):null
                        }
                        {
                            this.props.left?this.props.left:null
                        }
                        <input type={this.props.type || "text"}
                               className={`input ${inputClassName}`}
                               value={this.props.value}
                               ref={this.inputNode}
                               autoComplete={"new-password"}
                               placeholder={this.state.placeholder}
                               required={this.props.required}
                               {...rest}
                               style={inputStyle}
                               onFocus={() => {
                                   this.setState({placeholder: ""});
                                   this.rootNode.current!.classList.add("hover");
                               }}
                               onBlur={(event) => {
                                   this.setState({placeholder: this.props.placeholder || ""});
                                   this.handle();
                                   this.props.onBlur && this.props.onBlur(event);
                                   this.rootNode.current!.classList.remove("hover");
                               }}
                               onChange={(event) => {this.changeState(event)}}/>
                    </div>
                    {
                        this.props.right?this.props.right:null
                    }
                    {
                        this.state.validErr?(
                            <span className={'inputWarn'} style={{left: this.state.offsetLeft}} dangerouslySetInnerHTML={{__html: this.state.errText}}></span>
                        ):null
                    }
                </div>
            </InputBox>
        );
    }
}
export default withTranslation()(Input)
