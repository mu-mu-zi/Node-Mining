import React from 'react'
import JumpBtn from 'components/Button/BackBtn'
import { SuccessNode, SuccessIcon, Wrapper } from './BuyNodes.style'
import { Row, RowStart } from 'components/BaseElement/Row'
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import Box, { Typography } from '../../components/BaseElement/index';
import { useTranslation } from 'react-i18next';
import SecondBtn from 'components/Button/Second';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';

interface Iprops {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export default function PurchaseSuccess(props: Iprops) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { theme } = useTheme()
  return (
    <>
      <JumpBtn
        text="Back"
        onClick={() => props.setStep(2)}
      />

      <Column
        marginTop={theme.isH5 ? '16px' : '.61rem'}
        gap={theme.isH5 ? '16px' : '0'}
      >
        <SuccessNode src={require('assets/images/Nodes/PurchaseSuccess.png')} alt="" />

        <Row gap={"8px"} margin={theme.isH5 ? '0' : '.16rem 0 .48rem'}>
          <SuccessIcon src={require('assets/svg/Success_icon.svg').default} alt="" />
          <Typography
            color={'#fff'}
            fontSize={theme.isH5 ? '12px' : '.2rem'}
            fontWeight={'700'}
          >{t(`Purchase Success`)}</Typography>

        </Row>

        <SecondBtn
          onClick={() => navigate('/mynodes')}
        >
          {t(`VIEW MY NODES`)}
        </SecondBtn>
      </Column>
    </>
  )
}