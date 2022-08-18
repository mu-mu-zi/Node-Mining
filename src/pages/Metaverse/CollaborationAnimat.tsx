
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

export interface Animation {
  list: AnimateContent[],
  startTime?: number,
  margintop?: string, 
  speed?: number
}

export default function CollaborationAnimate(props: Animation) {
  const {t} = useTranslation()
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
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }}
      transition-timing-function={'ease-out'}
      modules={[Autoplay]}
      style = {{height: '600px', marginTop: margintop}}
    >
      {
        list && list.map((item,index) => {
          return (
            <SwiperSlide key={index}>
              <Grid
                gap="16px 0px"
                padding="10px"
              >
                <CollaborationCard>
                  <img src={item.pngUp} alt="" />
                  {/* <img src={require('./collaboration_1.png')} alt="" /> */}
                  <Typography
                    maxWidth='159px'
                    fontSize='20px'
                    fontWeight='400'
                    color='#ffffff'
                    textAlign={'center'}
                  >
                    {t(`${item.nameUp}`)}
                  </Typography>
                </CollaborationCard>
                <CollaborationCard>
                  <img src={item.pngDown} alt="" />
                  <Typography
                    maxWidth='159px'
                    fontSize='20px'
                    fontWeight='400'
                    color='#ffffff'
                    textAlign={'center'}

                  >
                    {t(`${item.nameDown}`)}
                  </Typography>
                </CollaborationCard>
              </Grid>
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  )
}