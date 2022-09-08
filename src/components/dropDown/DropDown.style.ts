import styled from "styled-components";

export const DropDownStyle = styled.div<{color: string, disabled?: boolean}>`
    position: relative;
    height: 100%;
    color: ${({theme, color}) => color};
    box-sizing: border-box;

    .dropdownTrigger{
        position: relative;
        height: 100%;
        line-height: 16px;
        cursor:pointer;
        &.disabled{
            cursor: default;
        }
        .label{
            width: 100%;
        }
        .text{
            flex: 1;
            margin-right: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .icon-box{
        transition: all 0.1s;
        svg{
            path{
                fill: ${({theme, color}) => color};
            }
        }
        &.active{

            transform: rotate(180deg);
            /*@media screen and (max-width: 900px) {
                transform: rotate(180deg);
            }*/
            svg{
                path{

                }
            }
        }
    }
    &:hover{

        &.icon-box{
            @media screen and (min-width: 900px) {
                transform: rotate(180deg);
            }
            svg{
                path{

                }
            }
        }
    }
    .icon{
        width: 16px;
        height: 16px;
        margin-left: 6px;
    }
`;
export const OptionContainer = styled.div`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 100%);
    z-index: 100;
    padding-top: 16px;
    ::-webkit-scrollbar{
        display: none;
    }
    &.right{
        right: 0;
        left: unset;
        transform: translate(0, 100%);
    }
`;
export const Option = styled.ul<{optionBgColor?: string}>`
    list-style: none;
    min-width: max-content;
    background: #151315;
    border-radius: 8px;
    padding: 16px;
    padding-bottom: 0px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    /*visibility: hidden;*/
    .OptionItem{
        position: relative;
        font-size: 16px;
        font-weight: 500;
        line-height: 25px;
        cursor:pointer;
        color: #fff;
        text-align: center;
        padding-bottom: 10px;
        &.active{
          color: #00E88A;
        }
        &:not(:last-of-type){
            margin-bottom: 10px;
            &:not(.disabledSplitor):after{
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background: rgba(102, 102, 102, 0.4);
            }
        }
    }
`;
