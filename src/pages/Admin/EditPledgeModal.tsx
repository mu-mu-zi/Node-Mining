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
import { Title } from "./Staking";
import { RowBetween, RowCenter } from "components/BaseElement/Row";
import { adminAddress } from "utils/global";
import DropDown from "components/dropDown/DropDown";
import { useEffectState } from "hooks/useEffectState";
import { useState } from "react";
import DatePickerZ from "components/DatePicker/DatePicker";

interface AA {
  type: number
}

const FlexTypography = styled(Flex)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  grid-gap: 17px;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.sm`
    grid-gap: 13px;
    flex-direction: column;
    align-items: self-start;
  `}
`
type BaseValueType = string | number | Date;
type ValueType = BaseValueType | BaseValueType[] | undefined;

export default function EditPledgeModal(props: IOpenModal & AA) {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [selectCoin, setSelectCoin] = useState<{ text: string; value: number }>()

  const state = useEffectState({
    selectOption: [
      { text: 'Single Currency Pledge', value: 1 },
      { text: 'Liquidity Pledge', value: 2 }
    ],
    MiningTime: '' as ValueType,
  })

  return (
    <Modal
      onClose={() => props.destoryComponent()}
      type={theme.isH5 ? 'modal' : 'modal'}
      // isH5={theme.isH5}
      style={{ background: "#1A1919", width: theme.isH5 ? '90%' : 'initial', padding: '24px' }}
    >
      <ColumnStart gridGap={theme.isH5 ? '16px' : ".24rem"}>

        <Title>
          {t(`Edit Pledge Parameters`)}
        </Title>

        <FlexTypography >
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Pledge Type`)}</Text>
          <Inp
            disabled
            value={selectCoin?.text}
            right={
              <RowCenter
                height={theme.isH5 ? '32px' : '.38rem'}
                cursor={'pointer'}
              >
                <DropDown
                  options={state.selectOption}
                  defaultValue={state.selectOption[props.type]?.value}
                  onChange={(selectd) => {
                    setSelectCoin(selectd)
                  }}
                >
                  <Icon
                    display={'block'}
                    onClick={() => console.log('123')}
                    marginRight={'16px'}
                    src={require('assets/svg/Rectangle39.svg').default}
                  ></Icon>
                </DropDown>
              </RowCenter>
            }
          />
        </FlexTypography>

        <FlexTypography>
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`APR`)}</Text>
          <Inp
            value={adminAddress}
            disabled
            className="disabled"
          />
        </FlexTypography>

        <FlexTypography>
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Handling fee`)}</Text>
          <Inp
            value={'2.45%'}
            disabled
            className="disabled"
          />
        </FlexTypography>

        <FlexTypography>
          <Text width={'185px'} fontWeight={'400'} fontSize={theme.isH5 ? '14px' : '.2rem'} color={'#ffffff'} >{t(`Mining time`)}</Text>
          <DatePickerZ
            onChange={(date, dateString) => {
              state.MiningTime = dateString
            }}
            value={state.MiningTime}
            // format={formatToken}
            format="yyyy-MM-dd HH:mm:ss"
            zIndex={10001}
            type="dateTime"
            triggerRender={({ placeholder }) => (
              <Inp
                disabled
                value={state.MiningTime as string}
                placeholder={`Please select the mining start time`}
                right={<Flex alignItems={'center'} padding={'0 18px'} >
                  <Icon src={require('assets/svg/icon_calendar.svg').default} />
                </Flex>}
              />

            )}
          />
        </FlexTypography>

        <Flex width={'100%'} justifyContent={'center'} alignItems={'center'} gridGap={theme.isH5 ? '16px' : '.24rem'} alignSelf={'center'}>
          <Second style={{
            padding: theme.isH5 ? '8px 0' : '.1rem 0',
            width: theme.isH5 ? '100%' : '1.75rem'
          }}>Cancel</Second>
          <Normal padding={theme.isH5 ? '8px 0' : '.1rem 0 '} width={theme.isH5 ? '100%' : '1.75rem'}>Pledges</Normal>
        </Flex>

      </ColumnStart>
    </Modal>
  )
}

const Inp = styled(Input)`
  background: transparent;
  border: 1px solid #6B6B6B;
  border-radius: 60px;
  flex: 1;
  min-width: 5.24rem;
  padding: 0 0 0 12px;
  box-sizing: border-box;
  height: .4rem;
  font-size: .14rem;
  ${({ theme }) => theme.mediaWidth.sm`
    height: 32px;
    width: 100%;
    min-width: initial;
    font-size: 12px;
  `}
  &:hover {
    border: 1px solid #00E88A;
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
    border: 1px solid #00E88A;
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }
  &:focus {
    border: 1px solid #00E88A;
    color: #00E88A;
    ::placeholder {
      color: #00E88A;
    }
  }
  &.disabled {
    border: 1px solid #3D3D3D;
    color: #3D3D3D;
    background-color: rgba(217, 217, 217, 0.1);
  }
  &:disabled {
    border: 1px solid #3D3D3D;
    color: #3D3D3D;
    background-color: rgba(217, 217, 217, 0.1);
  }

.input {
    color: #00E88A;
    border: none;
    outline: unset;
    font-size: .14rem;
    height: 31px;
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
    &:disabled {
      color: #6B6B6B;
    }
    ${({ theme }) => theme.mediaWidth.sm`
      font-size: 12px;
    `}
  }
  .adminInput {
    color: #ffffff;
  }
`