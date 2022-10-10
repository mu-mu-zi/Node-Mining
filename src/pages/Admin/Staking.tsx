import { Column, ColumnStart } from "components/BaseElement/Column";
import Flex from "components/BaseElement/Flex";
import Normal from "components/Button/Normal";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import Box, { Text } from "components/BaseElement";
import { RowBetween } from "components/BaseElement/Row";
import { Table, Td, Th, Tr } from "components/BaseElement/Table";
import { useContext } from "react";
import { ModalContext } from "components/provider/ModalProvider";
import AllocationModal from "./AllocationModal";
import EditPledgeModal from "./EditPledgeModal";
import useTheme from "hooks/useTheme";

export const Title = styled.div`
  border-left: 4px solid #F6B91B;
  padding-left: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`

const _Th = styled(Th)`
  border: 1px solid rgba(228, 228, 228, 0.2);
  padding: .25rem 0;
  ${({ theme }) => theme.mediaWidth.sm`
    padding: 16px 10px;
    white-space: nowrap;
  `}
  `
const _Td = styled(Td)`
  border: 1px solid rgba(228, 228, 228, 0.2);
  padding: .25rem 0;
  text-align: center;
  ${({ theme }) => theme.mediaWidth.sm`
    padding: 16px 10px;
    white-space: nowrap;
  `}
`

export default function () {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { openModal } = useContext(ModalContext)
  return (
    <ColumnStart padding={theme.isH5 ? '32px 0' : '.31rem .5rem 3rem'} gridGap={theme.isH5 ? '55px' : '.78rem'}>

      <ColumnStart width={'100%'} gridGap={theme.isH5 ? '16px' : '.43rem'}>

        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={theme.isH5 ? 'column' : 'row'}
          width={'100%'}
          gridGap={theme.isH5 ? '16px' : '0'}
        >
          <ColumnStart gridGap={theme.isH5 ? '16px' : '.16rem'}>
            <Title>{t(`Today's Distribution Bonus`)}</Title>
            <Text fontSize={'14px'} fontWeight={'400'} color={'#ffffff'} >{t(`If GETA is not set before 11:59:59 each day, the next day 00:00:00 will default to the last assigned amount.`)}</Text>
          </ColumnStart>
          <Normal onClick={() => {
            openModal(AllocationModal, {})
          }} padding={'10px 18px'} fontSize={'14px'} style={{alignSelf: theme.isH5 ? 'start' : 'center'}}>{t(`ALLOCATION OF GETA TOKENS`)}</Normal>
        </Flex>

        <Box width={'100%'} overflow={'auto'}>
          <Table width={'100%'}>
            <thead>
              <Tr
                fontSize={'14px'}
                fontWeight={'400'}
                color={'#ffffff'}
                background={'#312F2A'}
              >
                <_Th>{t(`Number of assignments`)}</_Th>
                <_Th>{t(`Contract Address`)}</_Th>
                <_Th>{t(`Allocation time`)}</_Th>
              </Tr>
            </thead>

            <tbody>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>243,356,000</_Td>
                <_Td>0x53aA52D80b2c39126eaDC0A67C95d9feB41d785b</_Td>
                <_Td>2022-09-29 12:00:00</_Td>
              </Tr>
            </tbody>

          </Table>
        </Box>
      </ColumnStart>

      <ColumnStart width={'100%'} gridGap={theme.isH5 ? '16px' : '.19rem'}>


        <Title>{t(`Today's Distribution Bonus`)}</Title>

        <Box width={'100%'} overflow={'auto'}>
          <Table width={'100%'}>
            <thead>
              <Tr
                fontSize={'14px'}
                fontWeight={'400'}
                color={'#ffffff'}
                background={'#312F2A'}
              >
                <_Th>{t(`Type`)}</_Th>
                <_Th>{t(`APR`)}</_Th>
                <_Th>{t(`Handling fee`)}</_Th>
                <_Th>{t(`Start mining time`)}</_Th>
                <_Th>{t(`Operation`)}</_Th>
              </Tr>
            </thead>

            <tbody>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>Single Currency Pledge</_Td>
                <_Td>2.46%</_Td>
                <_Td>1%</_Td>
                <_Td>2022-09-29 12:00:00</_Td>
                <_Td onClick={() => {
                  openModal(EditPledgeModal, {
                    type: 0
                  })
                }} color={'#F6B91B'}>EDIT</_Td>
              </Tr>
              <Tr
                fontSize={'16px'}
                fontWeight={'600'}
                color={'#ffffff'}
                background={'#1A1919'}
              >
                <_Td>Liquidity Pledge</_Td>
                <_Td>--</_Td>
                <_Td>1%</_Td>
                <_Td>2022-09-29 12:00:00</_Td>
                <_Td onClick={() => {
                  openModal(EditPledgeModal, {
                    type: 1
                  })
                }} color={'#F6B91B'}>EDIT</_Td>
              </Tr>
            </tbody>

          </Table>
        </Box>
      </ColumnStart>

    </ColumnStart>
  )
}