import styled from "styled-components";

const $height = "calc(48px - 2px)";
export const InputBox = styled.div`
    position: relative;
    //padding: 0 8px 0 12px;
    padding: 0 12px;
    font-size: 20px;
    height: ${$height};
    background: #fff;
    border-radius: 8px;
    border: 1px solid transparent;
    /* transition: width, flex 0.25s; */
    /* transform: skew(-7deg); */
    .input-content{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        /* transform: skew(7deg); */
    }
    .label{
        display: inline-block;
        text-align: left;
        white-space: nowrap;
        margin-right: 4px;
    }
    .input{
        width: 100%;
        background-color: transparent;
        font-size: 20px;
        font-weight: 500;
        height: 100%;
        text-align: left;
        /*padding-right: 4px;*/
        box-sizing: border-box;
        font-family: NHaas, Helvetica, Montserrat-Regular, PingFang SC, Microsoft YaHei, SourceHanSerifCN-Medium, robotoregular, Hiragino Sans GB, Heiti SC, WenQuanYi Micro Hei, Helvetica, Arial, monospace, serif;
        &::-webkit-input-placeholder {
            color: rgba(86, 52, 16, 0.4);
        }
        &::-moz-input-placeholder {
            color: rgba(86, 52, 16, 0.4);
        }
        &::-ms-input-placeholder {
            color: rgba(86, 52, 16, 0.4);
        }
        &.price{
            font-size: 24px;
            font-weight: 600;
            color: #050505;
        }
    }
    .inputWarn{
        display: inline-block;
        position: absolute;
        background-color: rgba(0,0,0,0.5);
        color: red;
        padding: 4px 6px;
        border-radius: 4px;
        bottom: ${$height};
        font-size: 14px;
        font-weight: normal;
        white-space: nowrap;
        pointer-events: none;
        &:after{
            content: "";
            display: inline-block;
            position: absolute;
            left: 10px;
            bottom: -6px;
            border-left: 6px solid transparent;
            border-top: 6px solid rgba(0,0,0,0.5);
            border-right: 6px solid transparent;
        }
    }
`;
