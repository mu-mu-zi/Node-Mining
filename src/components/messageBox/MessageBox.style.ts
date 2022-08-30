import styled from "styled-components";
import { Z_INDEX } from "utils/global";


export const MessageBoxStyle = styled.div`
    position: fixed;
    right: 0;
    top: 1.18rem;
    /* transform: translate(-50%, -50%); */
    /*width: 358px;*/
    padding: 24px;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 8px 0 0 8px;
    box-sizing: border-box;
    z-index: ${Z_INDEX.toast};
    pointer-events: none;
    box-shadow: 0px 4px 20px rgba(246, 185, 27, 0.25);  
    &.bottomRight{
        left: initial;
        top: initial;
        transform: none;
    }
    .flex-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .title{
        font-size: 20px;
        font-weight: 500;
        line-height: 31px;
        color: #fff;
        word-break: break-word;
    }
    .loading {
        img {
            animation: rotateImg 1s linear infinite;
            @keyframes rotateImg {
                0% {transform : rotate(0deg);}
                100% {transform : rotate(360deg);}
            }     
        }
    }
    .subtitle{
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.4);
        margin-left: 64px;
    }
    .icon{
        width: 32px;
        height: 32px;
        /* margin-right: 16px; */
        text-align: center;
    }
    .content{
        font-size: 20px;
        font-weight: 600;
        line-height: 31px;
        color: #fff;
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
