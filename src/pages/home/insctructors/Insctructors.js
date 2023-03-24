import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper';
import { motion } from 'framer-motion'
import './Instructors.scss'
import { Button } from 'react-bootstrap';


function Insctructors(){

    const cardMotion = {
      rest:{
        rotateY:0,
        transition:{duration:0.4,}
      },
      rotate:{
        rotateY:180,
        transition:{duration:0.4,}
      }
    };

    const imgMotion = {
      rest:{
        opacity:1,
        transition:{duration:0.4,}
      },
      rotate:{
        opacity:0,
        transition:{duration:0.4,}
      }
    }

    function InstructorCard({img, name, desc}){
      return(
        <motion.div className="instructor-card" initial="rest" whileHover="rotate" animate="rest">
          <motion.div variants={cardMotion} className="card-content">
            <motion.img className="instructor-img" variants={imgMotion} src={img} alt="avatar" />
            <div className="instructor-header">
              <h4 className='instructor-name'>{name}</h4>
            </div>
            <div className="instructor-body">
              <p className="instructor-position">{desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )
    } 

    return(
      <div className="home-sections sectionInstructor">
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="section-header">
                <h3 className="title-instrocteur mb-2">Devenir instructeur</h3>
                <p className="instrocteur-desc">Nos instructeurs enseignent à des milliers de <br />
                personnes à travers le monde.<br />
                Nous vous offrons l'appui et les outils <br />
                nécessaires pour démontrer votre expertise.</p>
                <Button className="btn-instrocteur">Commencez à enseigner</Button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="section-body">
                <div className="instructor-wrapper">
                  <Swiper className="instructor-swiper"
                    spaceBetween={20}
                    slidesPerView={2.25}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    >
                    <SwiperSlide>
                      <InstructorCard img="./images/Instruteur1.png" name="avatar" desc="Text goes here" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <InstructorCard img="./images/Instruteur2.png" name="avatar" desc="Text goes here" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <InstructorCard img="./images/Instruteur3.png" name="avatar" desc="Text goes here" />
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

export default Insctructors