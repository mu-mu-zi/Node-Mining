import Box, { Text } from "components/BaseElement";
import { Column, ColumnStart } from "components/BaseElement/Column";
import Flex from "components/BaseElement/Flex";
import { Icon } from "components/BaseElement/Icon";
import Normal from "components/Button/Normal";
import LiquidityPledgeModal from "components/LiquidityPledge/LiquidityPledgeModal";
import { ModalContext } from "components/provider/ModalProvider";
import useTheme from "hooks/useTheme";
import { useContext } from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const Row = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  max-width: 3.52rem;
  width: 100%;
  font-size: .2rem;
  font-weight: 400;
  color: #ffffff;
  ${({theme}) => theme.mediaWidth.sm`
    font-size: 14px;
    max-width: 100%;
  `}
`

export default function LiquidityPledge() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { openModal } = useContext(ModalContext);
  
  const onPledges = () => {
    openModal(LiquidityPledgeModal,{

    })
  }

  return (
    <ColumnStart 
      padding={theme.isH5 ? '16px' : '.24rem'} 
      gridGap={theme.isH5 ? '16px' : '.24rem'}
      background={'#1a1919'}
      borderRadius={'16px'}
    >
      <Flex alignItems={'center'} gridGap={'8px'}>
        <Icon width={theme.isH5 ? '32px' : '.4rem'} height={theme.isH5 ? '32px' : '.4rem'} src={require('./img_usdt 1.svg').default} />
        <Text fontSize={theme.isH5 ? '16px' : '.2rem'} fontWeight={'700'} color={'#ffffff'} >
          {t(`GETA/USDT`)}
        </Text>
      </Flex>

      <Row>
        <Text>{t(`TVL`)}</Text>
        <Text fontWeight={'700'}>1000,000,000.23</Text>
      </Row>

      <Row>
        <Text>{t(`Pledges`)}</Text>
        <Flex gridGap={'8px'}>
          <Icon src={require('./img_usdt 1.svg').default} />
          <Text fontWeight={'700'}>{t(`GW/USDT LP`)}</Text>
        </Flex>
      </Row>

      <Row>
        <Text>{t(`Get`)}</Text>
        <Text fontWeight={'700'}>{t(`GETA`)}</Text>
      </Row>

      <Row>
        <Flex>
          <Text>{t(`LP Balance: `)}</Text>
          <Text fontWeight={'700'}>1.4234 LP</Text>
        </Flex>
        <Normal width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`Pledges`)}</Normal>
      </Row>

      <Row>
        <Flex>
          <Text>{t(`Acquired: `)}</Text>
          <Text fontWeight={'700'}>34,427,42 GETA</Text>
        </Flex>
        <Normal width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`Extraction`)}</Normal>
      </Row>

      <Row>
        <Flex>
          <Text>{t(`LP Pledges: `)}</Text>
          <Text fontWeight={'700'}>284.428 LP</Text>
        </Flex>
        <Normal width={theme.isH5 ? '88px' : '1.06rem'} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem 0'} fontSize={theme.isH5 ? '11px' : '.16rem'} >{t(`Redemption`)}</Normal>
      </Row>

      <Box alignSelf={'center'} width={'100%'}>
        <Normal onClick={onPledges} padding={theme.isH5 ? '8px 10px' : '.105rem 1.1rem'}>{t(`Pledges`)}</Normal>
      </Box>

      <Flex alignSelf={'center'} fontSize={theme.isH5 ? '14px' : '.14rem'} fontWeight={'400'} color={'#ffffff'}>
        <Text>{t(`Liquidity for GETA/USDT(LP) on`)}</Text>
        <Text cursor={'pointer'} marginLeft={'4px'} color={'#F6B91B'}>{t(`Pancake`)}</Text>
        <Icon marginLeft={'4px'} src={require('assets/svg/link_gray.svg').default} />
      </Flex>

    </ColumnStart>
  )
}