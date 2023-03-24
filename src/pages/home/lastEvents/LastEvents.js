import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './LastEvents.scss'
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Aos from 'aos';

function LastEvents() {

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);


  function EventCard({ img, date, hour, title, username, avatar, link, info }) {

    return (
      <div className="events-card">
        <div className="card-left">
          <img className="event-img" src={img} alt="img" />
        </div>
        <div className="card-right">
          <div className="event-info">
            <div className="event-header">
              <h6 className="event-date">{date} - {hour}</h6>
              <h4 className="event-title">{title}</h4>
            </div>


            <div className="event-body">
              <div className="event-organiser">
                <span className="or-made">Organisé par</span>
                <div className="or-by">
                  <img src={avatar} alt="avatar" className="or-avatar" />
                  <a href="/" className="or-name">{username}</a>
                </div>
              </div>
              <a href="/" className="event-reserve">Réserver</a>
            </div>

            <div className="event-footer">
              <a href="/" className="event-button">Plus d'information</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="home-sections background-color">
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-12">
            <div className="section-header">

              <div className="title"
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"> 
                <div class="circle"></div> 
                <h3 className='Title'>
                  Derniers évènements 
                  <hr className='hr'/> 
                </h3>   
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="section-body">
              <div className="events-wrapper">
                <Swiper
                  className="events-swiper"
                  spaceBetween={20}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  loop={true}
                  onSlideChange={() => console.log('slide change')}
                  onSlideChangeTransitionStart={() => console.log('start')}
                  onSlidePrevTransitionEnd={() => console.log('start')}
                  onSwiper={(swiper) => console.log(swiper)}>
                  <SwiperSlide>
                    <EventCard
                      img="./images/Rectangle88.png"
                      date="06/04/2022"
                      hour="22H:00"
                      title="Selling from A to Z"
                      avatar="./images/Instruteur1.png"
                      username="Omar Abdelrahman"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <EventCard
                      img="./images/Rectangle881.png"
                      date="06/04/2022"
                      hour="22H:00"
                      title="Selling from A to Z"
                      avatar="./images/Instruteur1.png"
                      username="Omar Abdelrahman"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <EventCard
                      img="./images/Rectangle882.png"
                      date="06/04/2022"
                      hour="22H:00"
                      title="Selling from A to Z"
                      avatar="./images/Instruteur1.png"
                      username="Omar Abdelrahman"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LastEvents