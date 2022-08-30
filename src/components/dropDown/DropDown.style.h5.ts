import styled from "styled-components";

export const DropDownStyle = styled.div<{color: string, disabled?: boolean}>`
    position: relative;
    height: 100%;
    color: ${({theme, color}) => color};
    box-sizing: border-box;
    .dropdownTrigger{
        height: 100%;
        line-height: 16px;
        cursor:pointer;
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

            @media screen and (max-width: 900px) {
                transform: rotate(180deg);
            }
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
    &.right{
        right: 0;
        left: unset;
        transform: translate(0, 100%);
    }
`;
export const Option = styled.ul<{optionBgColor?: string}>`
    list-style: none;
    min-width: max-content;

    border-radius: 12px;
    padding: 6px 0;
    text-align: center;
    white-space: nowrap;

    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    /*visibility: hidden;*/
    .OptionItem{
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        padding: 6px 12px;
        margin: 0 8px;
        cursor:pointer;
        border-bottom: none!important;
        color: #ffffff;
        text-align: left;
        border-radius: 8px;
        &.active{
            background: ${({theme, optionBgColor}) => optionBgColor ? optionBgColor : 'unset'};

        }
        &:not(:last-child){
            
        }

    }
`;
