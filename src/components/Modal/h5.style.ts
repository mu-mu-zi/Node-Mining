import styled from "styled-components";
import { Z_INDEX } from "utils/global";

export const ModalBox = styled.div`
    position: fixed;
    left: 0;
    /* width: 100vw; */
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: ${Z_INDEX.modal};
    white-space: normal;
    background-color: rgba(0, 0, 0, 0.6);
    .modal_content_box{
        position: absolute;
        left: 0;
        bottom: 0;
        /* width: 100vw; */
        width: 100%;
        /* padding: 16px 32px 32px; */
        box-sizing: border-box;
        border-radius: 16px 16px 0 0;
        overflow: auto;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 8px 8px 0px 0px;
        .close{
            /*position: absolute;
            right: 0;
            top: 0;
            padding: 15px;*/
            .closeIcon{
                width: 16px;
                height: 16px;
                cursor:pointer;
                vertical-align: initial;
            }
        }
        .modal_content{
            padding: 16px 15px 32px;
            background-color: #191919;
            width: 100%;
            box-sizing: border-box;
            /* max-height: 70vh;
            overflow: auto; */
        }
    }
    .modal-title{
        font-size: 24px;
        font-weight: 600;
        text-align: left;
    }
`;

export const Border = styled.div`
    width: 90px;
    height: 3px;
    border-radius: 24px;
    margin: 0 auto 32px;
`;
