import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './BestCategories.scss'
import { RightOutlined } from '@ant-design/icons';
import Aos from 'aos';
function BestCategories() {

  const [onHover,setOnHover] = useState(false) ; 






  return (
    <div className="bestCategories-container"  >
      <h3 className='bestCategories-title' 
         data-aos="fade-left"
         data-aos-offset="200"
         data-aos-delay="50"
         data-aos-duration="1000"
         data-aos-easing="ease-in-out"
         data-aos-mirror="true"
         data-aos-once="false"> Meilleurs Categories </h3>
      <div className={onHover?  "bestCategories-cards-hover": "bestCategories-cards"}  >
       
        <div className= {onHover?  "bestCategories-card-hover": "bestCategories-card"}  
        onMouseEnter={()=>{setOnHover(true)}} onMouseLeave={()=>{setOnHover(false)}} >   
          <div className="bestCategories-card-Title">
            <h4 style={{color:onHover && "black"  }}> WEBSITE DESIGN DEVELOPMENT</h4>
          </div>
          <div className="bestCategories-card-content">
            <p style={{color:onHover && "black"  }}> Our website design team will work closely with you to plan the structure of your website content and even suggest new content and promotional ideas </p>
          </div>
          <div className="bestCategories-card-footer">
            <p style={{color:onHover && "black"  }}> Details <RightOutlined className='iconn' />
              <RightOutlined className='iconn' /> </p>
          </div>
        </div>
        <div className={onHover?  "bestCategories-card-transparent": "bestCategories-card"}  >
          <div className="bestCategories-card-Title">
            <h4 > BRANDING</h4>
          </div>
          <div className="bestCategories-card-content">
            <p> Behind every successful business is a recognisable brand, which has become inseparable from the services offered by the company.</p>
          </div>
          <div className="bestCategories-card-footer">
            <p> Details    <RightOutlined className='iconn' />
              <RightOutlined className='iconn' /> </p>
          </div>
        </div>
        <div className={onHover?  "bestCategories-card-transparent": "bestCategories-card"}  
        
        
        >
          <div className="bestCategories-card-Title">
            <h4> BRANDING</h4>
          </div>
          <div className="bestCategories-card-content">
            <p> Behind every successful business is a recognisable brand, which has become inseparable from the services offered by the company.</p>
          </div>
          <div className="bestCategories-card-footer">
            <p> Details    <RightOutlined className='iconn' />
              <RightOutlined className='iconn' /> </p>
          </div>
        </div>
        <div className={onHover?  "bestCategories-card-transparent": "bestCategories-card"}>
          <div className="bestCategories-card-Title">
            <h4> BRANDING</h4>
          </div>
          <div className="bestCategories-card-content">
            <p> Behind every successful business is a recognisable brand, which has become inseparable from the services offered by the company.</p>
          </div>
          <div className="bestCategories-card-footer">
            <p> Details    <RightOutlined className='iconn' />
              <RightOutlined className='iconn' /> </p>
          </div>
        </div>
        <div className={onHover?  "bestCategories-card-transparent": "bestCategories-card"}>
          <div className="bestCategories-card-Title">
            <h4> BRANDING</h4>
          </div>
          <div className="bestCategories-card-content">
            <p> Behind every successful business is a recognisable brand, which has become inseparable from the services offered by the company.</p>
          </div>
          <div className="bestCategories-card-footer">
            <p> Details    <RightOutlined className='iconn' />
              <RightOutlined className='iconn' /> </p>
          </div>
        </div>
        <div className={onHover?  "bestCategories-card-transparent": "bestCategories-card"}>
          <div className="bestCategories-card-Title">
            <h4> BRANDING</h4>
          </div>
          <div className="bestCategories-card-content">
            <p> Behind every successful business is a recognisable brand, which has become inseparable from the services offered by the company.</p>
          </div>
          <div className="bestCategories-card-footer">
            <p> Details    <RightOutlined className='iconn' />
              <RightOutlined className='iconn' /> </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default BestCategories