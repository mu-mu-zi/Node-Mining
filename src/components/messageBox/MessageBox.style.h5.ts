import styled from "styled-components";

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
    background: rgba(0,0,0,0.35);
    border-radius: 0 8px 0 8px;
    margin-top: 8px;
    box-sizing: border-box;
    pointer-events: none;
    bottom: 0;
    left: 0;
    z-index: 5000;

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;


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
