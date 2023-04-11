import React, { useEffect, useState } from 'react'
import './OffresSections.scss'
import {CheckCircleOutlined} from '@ant-design/icons' ; 
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Aos from 'aos';


function OffersSection(){

    const [cardInfo,setCardInfo] = useState(false) ; 

    const hover = ()=>{
      setCardInfo(true) ; 
    } 
    
    useEffect (()=>{
      Aos.init({duration:2000}) ; 
    },[]) ;  

    return(
      <div className="home-sections" style={{backgroundColor:'white'}}>
        <div className="container" >
          <div className="row mb-3">
            <div className="col-md-12">
              <div className="section-header">
                <h2 className="section-title" 
                    data-aos="fade-right"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false">Nos Offres</h2>  <hr className='hr'/> 
                    <br />
                     
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="section-body">
                <div className="row g-4 justify-content-center">
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards m-auto" onMouseEnter={()=>{hover()}} 
                    onMouseLeave={()=>{setCardInfo(false)}} 
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    >
                     
                      <div className= {!cardInfo ? "oc-header" : "oc-headerHover"}>
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#CCA073" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                          
                        </svg>
                        <div className="header-info">
                          <h4 className="info-offre-title">Bronze</h4> 
                          <p className="info-offre-desc">Cours marketing</p>
                        </div>
                      </div>
                      
                      {cardInfo && 
                      <div className="oc-body">
                        <ul className="body-content">
                       
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                        </ul>
                      </div> 
                        }
                          {cardInfo &&   
                            <div className="oc-footer">
                              <a href="/acheter" className="footer-button">Acheter</a>
                            </div> 
                         }
                   
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards2 m-auto"  data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false">
                      <div className="oc-header">
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#CFCCC5" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="header-info">
                          <h4 className="info-offre-title">Silver</h4>
                          <p className="info-offre-desc">Cours Business</p>
                        </div>
                      </div>
                      <div className="oc-body">
                        <ul className="body-content">
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                          <li className="list-items">Certificat d'achèvement</li>
                        </ul>
                      </div>
                      <div className="oc-footer">
                        <a href="/acheter" className="footer-button">Acheter</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <div className="offers-cards3 m-auto"  data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false">
                      <div className="oc-header">
                        <svg className="header-logo" width="115" height="129" viewBox="0 0 115 129" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M84.299 58.7039L84.2989 58.7737C84.2989 74.486 73.3571 90.6487 57.4677 97.2826C41.5784 90.6487 30.6365 74.486 30.6365 58.7737V41.4055L56.464 30.8334C56.4664 30.8325 56.4688 30.8315 56.4711 30.8306C57.1108 30.5719 57.8888 30.5719 58.5286 30.8305C58.531 30.8315 58.5334 30.8325 58.5358 30.8334L84.3384 41.3953L84.299 58.7039Z" stroke="#D9BC6C" strokeWidth="61.2731" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="header-info">
                          <h4 className="info-offre-title">Gold</h4>
                          <p className="info-offre-desc">Cours Developpemnt Web</p>
                        </div>
                      </div>
                      <div className="oc-body">
                        <ul className="body-content">
                          <li className="list-items">23 Conférences</li>
                          <li className="list-items">Accès sur tablette et téléphone</li>
                          <li className="list-items">Cours en direct et enregistreur</li>
                          <li className="list-items">Certificat d'achèvement</li>
                          <li className="list-items">Accès aux ateliers en ligne après la fin du cours</li>
                        </ul>
                      </div>
                      <div className="oc-footer">
                        <a href="/acheter" className="footer-button">Acheter</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>
  
      </div>
      
    )
  }

export default OffersSection ; 