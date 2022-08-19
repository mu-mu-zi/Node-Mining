import styled from "styled-components";
import { Z_INDEX } from "utils/global";

export const ModalBox = styled.div`
    position: fixed;
    top: 0;
    height: calc( 100vh - 1.18rem );
    z-index: ${Z_INDEX.modal};
    white-space: normal;
    top: 1.18rem;
    right: 0;
    width: 376px;
    background: #191919;
    box-sizing: border-box;

    

    .modal_content_box{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-sizing: border-box;
        color: #fff;
        height: 100%;
        width: 100%;
        z-index: ${Z_INDEX.modal};
        padding: 32px 24px 32px;
        box-sizing: border-box;
        overflow: overlay;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;
