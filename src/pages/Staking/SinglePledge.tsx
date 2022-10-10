import Box, { Text } from "components/BaseElement";
import { Column, ColumnStart } from "components/BaseElement/Column";
import Flex from "components/BaseElement/Flex";
import { Icon } from "components/BaseElement/Icon";
import Normal from "components/Button/Normal";
import { MsgStatus } from "components/messageBox/MessageBox";
import { ModalContext } from "components/provider/ModalProvider";
import SinglePledgeModal from "components/SinglePledgeModal/SinglePledgeModal";
import useTheme from "hooks/useTheme";
import { useContext } from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { Notice } from "utils/tools";


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

export default function SinglePledge() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { openModal } = useContext(ModalContext);
  const onExtraction = () => {
    // to do

    Notice('You have successfully extracted', MsgStatus.success,
      {},
      <Text fontSize={'12px'} fontWeight={'400'} color={'#F6B91B'}>35.375 GETA</Text>)

  }
  
  const onPledge = () => {
    openModal(SinglePledgeModal,{

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
          {t(`GETA Single Currency Pledge`)}
        </Text>
      </Flex>

      <Row>
        <Text>{t(`Pledges`)}</Text>
        <Flex gridGap={'8px'}>
          <Icon src={require('./img_usdt 1.svg').default} />
          <Text fontWeight={'700'}>{t(`GETA`)}</Text>
        </Flex>
      </Row>

      <Row>
        <Text>{t(`Get`)}</Text>
        <Flex gridGap={'8px'}>
          <Icon src={require('./img_usdt 1.svg').default} />
          <Text fontWeight={'700'}>{t(`GETA`)}</Text>
        </Flex>
      </Row>

      <Row>
        <Text>{t(`APR`)}</Text>
        <Text fontWeight={'700'}>5.556%</Text>
      </Row>

      <Row
        style={{
          justifyContent: 'start',
          gap: '3px'
        }}
      >
        <Text>{t(`GETA Balance: `)}</Text>
        <Text fontWeight={'700'}>36.4384</Text>
      </Row>

      <Row>
        <Flex>
          <Text>{t(`Acquired: `)}</Text>
          <Text fontWeight={'700'}> --</Text>
        </Flex>
        <Normal onClick={onExtraction} padding={theme.isH5 ? '3.5px 9.5px' : '.065rem .145rem'} fontSize={'.16rem'} >{t(`Extraction`)}</Normal>
      </Row>

      <Row>
        <Flex>
          <Text>{t(`Pledged: `)}</Text>
          <Text fontWeight={'700'}> --</Text>
        </Flex>
      </Row>

      <Box alignSelf={'center'} width={'100%'}>
        <Normal onClick={onPledge} padding={theme.isH5 ? '8px 10px' : '.105rem 1.1rem'}>{t(`Pledges`)}</Normal>
      </Box>

    </ColumnStart>
  )
}