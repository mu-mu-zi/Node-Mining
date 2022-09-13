
import React,{useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay} from "swiper";
import 'swiper/css'
import { Typography } from 'components/BaseElement';
import { ColumnStart } from 'components/BaseElement/Column';
import { CollaborationCard } from './Metaverse.styled';
import { useTranslation } from 'react-i18next';
import { AnimateContent } from './types';
import Grid from 'components/BaseElement/Grid';
import useTheme from 'hooks/useTheme';

export interface Animation {
  list: AnimateContent[][],
  startTime?: number,
  margintop?: string, 
  speed?: number
}

export default function CollaborationAnimate(props: Animation) {
  const {t} = useTranslation()
  const {theme} = useTheme()
  const { list, margintop, speed } = props
  return (
    <Swiper 
      className="swiper"
      // direction: 'vertical'
      direction='vertical'
      // noSwiping={true}
      loop={true}
      speed= {speed}
      autoplay={{
        delay: 1000 * 3,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }}
      transition-timing-function={'ease-out'}
      modules={[Autoplay]}
      style = {{width: '100%', height: theme.isH5 ? '400px' : '600px', marginTop: margintop}}
    >
      {
        list && list.map((item,index) => {
          return (
            <SwiperSlide key={index}>
              <Grid
                gap={theme.isH5 ? '8px 0' : ".16rem 0px"}
                padding={theme.isH5 ? '0' : ".1rem"}
              >
                {
                  item.map((val,idx) => {
                    return   <CollaborationCard key={val.name}>
                    <img src={val.png} alt="" />
                    <Typography
                      maxWidth={theme.isH5 ? '68px' : '1.59rem'}
                      fontSize={theme.isH5 ? '11px' : '.2rem'}
                      fontWeight='400'
                      color='#ffffff'
                      textAlign={'center'}
                    >
                      {t(`${val.name}`)}
                    </Typography>
                  </CollaborationCard>
                  })
                }
              </Grid>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
}