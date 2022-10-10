import Box, { Typography, Text } from "components/BaseElement";
import Flex from "components/BaseElement/Flex";
import { Icon } from "components/BaseElement/Icon";
import { MsgStatus } from "components/messageBox/MessageBox";
import Modal from "components/Modal/Modal";
import { IOpenModal } from "components/provider/ModalProvider";
import useTheme from "hooks/useTheme";
import { Notice } from "utils/tools";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import Input from "components/form/Input";
import { ColumnStart } from "components/BaseElement/Column";
import Normal from "components/Button/Normal";
import Second from "components/Button/Second";

interface AA {

}

const Inp = styled(Input)`
  background: transparent;
  border: 2px solid #6B6B6B;
  border-radius: 60px;
  width: 100%;
  /* max-width: 3.68rem; */
  padding: 0 0 0 12px;
  box-sizing: border-box;
  height: .4rem;
  font-size: .14rem;
  ${({ theme }) => theme.mediaWidth.sm`
    height: 32px;
    width: 100%;
    max-width: initial;
    font-size: 12px;
  `}
  &:hover {
    border: 2px solid #00E88A;
    color: #00E88A;
    .email-input {
      ::placeholder {
        color: #00E88A;
      }
    }
    .submit {
      color: #ffffff;
      background: ${({ theme }) => theme.colors.hover};;
    }
  }
  &:active {
    border: 2px solid #00E88A;
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }
  &:focus {
    border: 2px solid #00E88A;
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }

.input {
    color: #00E88A;
    border: none;
    outline: unset;
    ::placeholder {
      color: #6B6B6B;
      font-size: .14rem;
    }
    &:hover {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:active {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    &:focus {
      color: #00E88A;
      ::placeholder {
        color: #00E88A;
      }
    }
    ${({ theme }) => theme.mediaWidth.sm`
      font-size: 12px;
    `}
  }
  .adminInput {
    color: #ffffff;
  }
`
const Max = styled(Box)`
  line-height: 1;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.normal};
  height: .38rem;
  padding: .085rem .12rem;
  font-size: .2rem;
  font-weight: 700;
  color: #000;
  cursor: pointer;
  border-radius: 60px;
  transform: translateX(1px);
  &:hover {
    color: #fff;
    background: ${({ theme }) => theme.colors.hover};;
  }
  ${({ theme }) => theme.mediaWidth.sm`
    height: 22px;
    width: 44px;
    font-size: 11px;
    border-radius: 48px;
    text-align: center;
    margin-right: 6px;
    line-height: 22px;
  `}
`

export default function LiquidityPledgeModal(props: IOpenModal & AA) {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'modal' : 'modal'}
      // isH5={theme.isH5}
      style={{ background: "#1A1919", width: theme.isH5 ? '90%' : 'initial', padding: '24px' }}
    >
      <ColumnStart gridGap={theme.isH5 ? '24px' : ".24rem"}>

        <Flex alignItems={'center'} gridGap={'8px'}>
          <Icon width={theme.isH5 ? '32px' : '.4rem'} height={theme.isH5 ? '32px' : '.4rem'} src={require('./img_usdt 1.svg').default} />
          <Text fontSize={theme.isH5 ? '16px' : '.2rem'} fontWeight={'700'} color={'#ffffff'} >
            {t(`Pledge GETA/USDT LP`)}
          </Text>
        </Flex>

        <Inp
          // regex={[{regStr: NUMBER_REG, tips: ""}]}
          onChange={(value) => {

          }}
          placeholder={'Please enter the number of pledges'}
          right={<Flex alignItems={'center'} gridGap={theme.isH5 ? '6px' : '.1rem'}>
            <Text fontSize={theme.isH5 ? '12px' : '.2rem'} fontWeight={'400'} color={'#6B6B6B'}>{t(`LP`)}</Text>
            <Max className='submit' onClick={() => {

            }}>MAX</Max>
          </Flex>}
        />

        <Flex width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={theme.isH5 ? '14px' : '.2rem'} fontWeight={'400'} color={'#ffffff'} >{t(`Available`)}</Text>
          <Text fontSize={theme.isH5 ? '14px' : '.2rem'} fontWeight={'700'} color={'#ffffff'}>{t(`2742.373 GETA`)}</Text>
        </Flex>

        <Flex width={'100%'}  alignItems={'center'} gridGap={theme.isH5 ? '16px' : '.24rem'} alignSelf={'center'}>
            <Second style={{
              padding: theme.isH5 ? '8px 0' : '.1rem 0',
              width: theme.isH5 ? '100%' : '1.75rem'
            }}>Cancel</Second>
            <Normal padding={theme.isH5 ? '8px 0' : '.1rem 0 '} width={theme.isH5 ? '100%' : '1.75rem'}>Pledges</Normal>
        </Flex>

        <Flex width={'100%'} alignSelf={'center'} justifyContent={'center'} fontSize={theme.isH5 ? '12px' : '.14rem'} fontWeight={'400'} color={'#ffffff'}>
          <Text>{t(`Liquidity for GETA/USDT(LP) on`)}</Text>
          <Text cursor={'pointer'} marginLeft={'4px'} color={'#F6B91B'}>{t(`Pancake`)}</Text>
          <Icon marginLeft={'4px'} src={require('assets/svg/link_gray.svg').default} />
        </Flex>

      </ColumnStart>
    </Modal>
  )
}