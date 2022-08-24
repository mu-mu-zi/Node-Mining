
import React,{useState,useRef, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Box from 'components/BaseElement';
import {Autoplay} from "swiper";
import 'swiper/css'
import banner1 from 'assets/images/index_banner.png'
import banner3 from 'assets/images/about_banner.png'
import { Image } from 'pages/Home/Home.styled';
import useTheme from 'hooks/useTheme';

export default function BannerSwiper() {
  const [list, setList] = useState<any>()
  const {theme} = useTheme()
  useEffect(() => {
    const aa = [
      {
        image: banner1
      },
      {
        image: banner3
      }
    ]
    setList(aa)
  },[])
  


  return (
    <Swiper 
      className="swiper"
      loop={true}
      speed= {1000}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: false
      }}
      transition-timing-function={'ease-out'}
      modules={[Autoplay]}
    >
      {
        list && list.map((item:any,index:any) => {
        return <SwiperSlide  key={index} style={{ height: theme.isH5 ? '327px' : '600px'}}>
            <Image style={{ width: '100%', height: '100%'}} src={item.image} alt="" />
          </SwiperSlide>
        })
      }

      {/* <div className='swiper-button-prev'></div>
      <div className='swiper-button-next'></div> */}

    </Swiper>
  )
}