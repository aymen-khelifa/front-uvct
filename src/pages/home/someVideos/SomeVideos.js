import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './SomeVideos.scss'
import {DoubleRightOutlined} from '@ant-design/icons' ; 


function SomeVideos(){

    function VideoCard({img,title,link}) {
      return(
        <div className="video-card">
          <img className="video-img" src={img} alt="img" />
          <h6 className="video-title">{title}</h6>
        </div>
      )
    }

    return(
      <div className="video-sections">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h3 className='VideosTitre' >Quelques vidéos</h3>
                  <hr className='hr'/>  
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="videos-wrapper">
                <Swiper
                    className="videos-swiper"
                     spaceBetween={20}
                    slidesPerView={3.5}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    breakpoints={{
                      320:{slidesPerView:1.25},
                      520:{slidesPerView:1.5},
                      620:{slidesPerView:1.75},
                      720:{slidesPerView:2},
                      820:{slidesPerView:2.25},
                      920:{slidesPerView:2.5},
                      1020:{slidesPerView:2.75},
                      1120:{slidesPerView:3},
                      1220:{slidesPerView:3.5},
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSlideChangeTransitionStart={()=>console.log('start')}
                    onSlidePrevTransitionEnd={()=>console.log('start')}
                    onSwiper={(swiper) => console.log(swiper)}
                    pagination={true}
                    >


                    <SwiperSlide>
                      <VideoCard 
                      img="./images/image15.png" /> 
                        <p className='videoCardTitre'> Video 1-22/01/2022 </p>  
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard  img="./images/image13.png" />
                     <p className='videoCardTitre'> Video 2-22/01/2022 </p>  
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard  img="./images/image14.png"/>
                      <p className='videoCardTitre'> Video 3-22/01/2022 </p>   
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard  img="./images/image15.png" />
                      <p className='videoCardTitre'> Video 4-22/01/2022 </p>   
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard  img="./images/image13.png" /> 
                      <p className='videoCardTitre'> Video 5-22/01/2022 </p>   
                    </SwiperSlide>
                    <SwiperSlide>
                      <VideoCard  img="./images/image14.png" />
                      <p className='videoCardTitre'> Video 6-22/01/2022 </p>  
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
          <h3 className='voir-plus-videos'> 
          Voir Plus 
          <DoubleRightOutlined 
          style={{position:"relative",bottom:"5px"}}/>
          </h3> 
        </div>
      </div>
    )
  }


export default SomeVideos