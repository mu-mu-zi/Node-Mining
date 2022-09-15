import styled from "styled-components";
import { Z_INDEX } from "utils/global";

export const MessageBoxStyle = styled.div`
    /*position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);*/
    /* width: 358px;
    padding: 16px 16px 16px 20px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 0 8px 0 8px;
    margin-top: 8px;
    box-sizing: border-box;
    pointer-events: none; */

    position: absolute;
    padding: 16px 16px 16px 20px;
    background: #3D3D3D;
    border-radius: 0 8px 0 8px;
    margin-top: 8px;
    box-sizing: border-box;
    pointer-events: none;
    bottom: 0;
    left: 0;
    z-index: ${Z_INDEX.toast};

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* box-shadow: 0px 4px 20px rgba(246, 185, 27, 0.25);   */
    border-radius: 8px;
    max-width: 328px;

    &.bottomRight{
        left: initial;
        top: initial;
        transform: none;
    }
    .title{
        font-size: 16px;
        font-weight: 600;
        line-height: 130%;
        color: #fff;
        word-break: break-word;
    }
    .icon{
        width: 20px;
        height: 20px;
        margin-right: 14px;
    }
    .content{
        font-size: 18px;
        font-weight: 400;
        color: #fff;
        line-height: 20px;
        padding-left: 24px;
        margin-top: 8px;
        word-break: break-word;
        max-height: 70vh;
        overflow-y: hidden;
    }
    .label{
        color: #fff;
    }
`;
