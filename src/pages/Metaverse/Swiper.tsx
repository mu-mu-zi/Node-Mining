
import React,{useState,useRef, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Box from 'components/BaseElement';
import {Autoplay,Pagination} from "swiper";
import 'swiper/css'
import 'swiper/css/pagination';
import { Image } from 'pages/Home/Home.styled';
import useTheme from 'hooks/useTheme';
import { useAsync } from 'react-use';
import { getBanners } from 'http/api';
import { filterBanner } from 'utils/tools';
import styled from 'styled-components';

const SwiperStyled = styled(Swiper)`
  .swiper-pagination-bullet {
    background-color: #666666;
    width: 32px;
    height: 5px;
    opacity: 1;
    border-radius: 0;
    ${({ theme }) => theme.mediaWidth.sm`
      width: 16px;
      height: 3px;
    `}
  }
  .bullet-active {
    background-color: #F6B91B;
    width: 32px;
    height: 5px;
    opacity: 1;
    border-radius: 0;
    ${({ theme }) => theme.mediaWidth.sm`
      width: 16px;
      height: 3px;
    `}
  }
  .swiper-pagination {
    bottom: 300px;
    ${({ theme }) => theme.mediaWidth.sm`
      bottom: 16px;
    `}
  }
`

export default function BannerSwiper() {
  const [list, setList] = useState<any>()
  const {theme} = useTheme()


  useAsync( async() => {
    let result = await getBanners()
    let banners = filterBanner(result.data, 3)
    setList(banners)
  },[])
  


  return (
    <SwiperStyled 
      className="swiper"
      loop={true}
      speed= {1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }}
      transition-timing-function={'ease-out'}
      modules={[Autoplay, Pagination]}
      pagination={{
        el: '.swiper-pagination',
        clickable:true,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'bullet-active'
      }}
      style={{
        minHeight: theme.isH5 ? '327px' : '860px'
      }}
    >
      {
        list && list.map((item:any,index:any) => {
        return <SwiperSlide  key={index} style={{ height: theme.isH5 ? '327px' : '860px'}}>
            <Image style={{ width: '100%', height: '100%'}} src={item.image} alt="" />
          </SwiperSlide>
        })
      }

      {/* <div className='swiper-button-prev'></div>
      <div className='swiper-button-next'></div> */}
      <div className="swiper-pagination"></div>
    </SwiperStyled>
  )
}