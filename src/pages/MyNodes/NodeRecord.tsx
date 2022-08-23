import React, { useEffect, useState } from 'react'
import Box, { Typography } from 'components/BaseElement';
import JumpBtn from 'components/Button/BackBtn';
import { Column, ColumnStart } from '../../components/BaseElement/Column';
import { useTranslation } from 'react-i18next';
import { RowCenter, RowStart } from 'components/BaseElement/Row';
import { NodeRecordWrap, MyNode, ActiveNode } from './MyNodes.style';
import Grid from 'components/BaseElement/Grid';
import Normal from 'components/Button/Normal';


export default function NodeRecord() {
  const { t } = useTranslation()
  const [active, setActive] = useState<number>()
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    setData([1, 2, 3, 4])
  }, [])

  return (
    <NodeRecordWrap>
      <Column
        gap=".64rem"
      >
        <RowStart
          width={'100%'}
        >
          <JumpBtn
            text="Back"
            path={-1}
          />
        </RowStart>

        <Grid
          gap={'1.68rem'}
          gridTemplateColumns={'repeat(4,1fr)'}
        >
          {
            data.map((item,index) => {
              return (
                <ActiveNode key={item} 
                  onClick={() => {setActive(index)}}
                >
                  <MyNode className={`${active === index ? 'node-png-active' : ''} `}>
                    <img src={require('assets/images/Nodes/logo_n.png')} alt="" />
                  </MyNode>
                  <Typography
                    fontSize={'.2rem'}
                    fontWeight={'350'}
                    color={"#fff"}
                    textAlign={'center'}
                  >
                    {t(`Nodes 01`)}
                  </Typography>
                </ActiveNode>
              )
            })
          }
        </Grid>

        <ColumnStart
          background={"#1A1919"}
          borderRadius={'4px'}
          padding={'.75rem 1.17rem .39rem .24rem'}
          gap={'.59rem'}
        >
          <Column
            gap=".16rem"
          >
            <RowStart 
              gap=".48rem" 
              color="#fff"
              fontSize=".2rem"
              fontWeight="350"
            >
              <Typography minWidth="1.56rem">{t(`Apikey`)}</Typography>
              <Typography>09ef018bb785ejr83kd2jdleweab4e7ef7f00481e1ffab3defd3b1a943cc04c4</Typography>
            </RowStart>
            <RowStart 
              gap=".48rem" 
              color="#fff"
              fontSize=".2rem"
              fontWeight="350"
            >
              <Typography minWidth="1.56rem">{t(`Cents earnings`)}</Typography>
              <Typography>09ef018bb785ejr83kd2jdleweab4e7ef7f00481e1ffab3defd3b1a943cc04c4</Typography>
            </RowStart>
          </Column>
          <RowCenter width="100%">
            <Normal>
              {t(`Settings`)}
            </Normal>
          </RowCenter>
        </ColumnStart>
        

      </Column>
    </NodeRecordWrap>
  )
}
