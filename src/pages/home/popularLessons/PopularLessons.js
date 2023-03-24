import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './PopularLessons.scss'
import {StarOutlined,DoubleRightOutlined} from '@ant-design/icons' ; 

function PopularLessons() {
      const [selectedCategory, setSelectedCategory] = useState('Design');
      const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setSelectedCategory(e.target.value);
      };
  return (

    <div className="home-sections background-color">
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="section-header">
              <h3 className="section-title mb-2">Cours populaires</h3>
              <hr className='hr' style={{ backgroundColor: "black" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-body">
              <div className="lessons-wrapper">
                <div className="lessons-categories mb-3">
                  {/* <Radio.Group onChange={onChange} value={selectedCategory}> 
                  {categories.map(category => {
                      return (
                        // <li className={`category-item`}>
                        //   <p onClick={() => setSelectedCategory(category)} className={`category-link ${category === selectedCategory ? 'category-selected' : ''}`}>{category}</p>
                        // </li>
                          <Radio value={category}>{category}</Radio>
                      )
                    })}
                  
                    
                  </Radio.Group> */}
                  <ul className="list-categories">

                  </ul>
                </div>
                <div className="lessons-card">
                  <Swiper
                    className="lessons-swiper"
                    spaceBetween={10}
                    slidesPerView={4}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    breakpoints={{
                      320: { slidesPerView: 1.65 },
                      520: { slidesPerView: 1.75 },
                      620: { slidesPerView: 1.85 },
                      768: { slidesPerView: 2.5 },
                      992: { slidesPerView: 3.25 },
                      1200: { slidesPerView: 4 },
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSlideChangeTransitionStart={() => console.log('start')}
                    onSlidePrevTransitionEnd={() => console.log('start')}
                    onSwiper={(swiper) => console.log(swiper)}>
                    {[1, 2, 3, 4, 5].map((value) => {
                      return (<SwiperSlide>
                        <LessonCard
                          img="./images/Rectangle881.png"
                          avatar="./images/Instruteur1.png"
                          username="John doe"
                          position={`${selectedCategory} diploma`}
                          rate={`${value}.8`}
                          price={`${value * 100} DT`}
                        />
                      </SwiperSlide>)
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className='voir-plus-lessons' style={{color:"black"}}> 
      Voir Plus 
      <DoubleRightOutlined 
          style={{position:"relative",color:"black",bottom:"4px"}}/></h3> 
    </div>

  )
}


export default PopularLessons


function LessonCard({ img, avatar, username, position, rate, price, link }) {
  return (
    <div className="lesson-card">
      <div className="lc-header">
        <img className="lesson-img" src={img} alt="img" />
        <div className="lesson-teacher">
          <img className="teacher-avatar" src={avatar} alt="avatar" />
          <span className="teacher-name">{username}</span>
          <span className="teacher-info">{position}</span>
        </div>
      </div>
      <div className="lc-body">
        <div className="lesson-info">
              <p> Become a web Developer and build your career </p>

        </div>
      </div>
      <hr style={{color:"grey",width:'240px',margin:'auto'}}/>
      <div className="lc-footer">
        <div className="lesson-rate">
        <StarOutlined style={{position:'relative',bottom:'4px',marginRight:'5px'}} />
          <span className="rate-txt">{rate}</span>
        </div>
        <div className="lesson-price">
     
         <strong className="price-txt">{price}</strong>
        </div>
      </div>
    </div>
  )
}

const categories = ['Design', 'Developpement web', 'Developpement personel', 'Business', 'Marketing', 'Photographe']
