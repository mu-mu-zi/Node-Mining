import styled from "styled-components";
import { Z_INDEX } from "utils/global";

export const ModalBox = styled.div`
    position: fixed;
    left: 0;
    width: 100vw;
    top: 0;
    height: 100vh;
    z-index: ${Z_INDEX.modal};
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    white-space: normal;
    .modal_content_box{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 564px;
        padding: 64px 102px 64px 102px;
        box-sizing: border-box;
        color: #fff;
        border-radius: 0 12px 0 12px;
        border: 3px solid transparent;
        background-image: linear-gradient(#000, #000),
                    linear-gradient(23.89deg, #AF6411 1.95%, #14FEF6 98.19%);
        background-origin: border-box;
        background-clip: padding-box, border-box;
        .close{
            position: absolute;
            right: 28px;
            top: 28px;
            text-align: right;
            .closeIcon{
                width: 48px;
                height: 48px;
                cursor: pointer;
            }
        }
    }
    .modal-title{
        font-size: 32px;
        font-weight: 600;
        line-height: 50px;
    }
    .modal-subtitle{
        font-size: 12px;
        font-weight: 500;
        line-height: 22px;
    }
`;
