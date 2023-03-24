import React, { useEffect, useState } from "react";
import "./BannerSection.scss";
import { MdNavigateNext } from "react-icons/md";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { QuickNavigation } from "../../../components/quick-navigation/quick-navigation";
import { Button, Carousel } from "antd";
import Typewriter from "typewriter-effect";
import AnimatedText from 'react-animated-text-content';

function BannerSection() {

  const [state] = useState({
    title: " Transformez votre vie ",
    title2: "grâce à l'apprentissage"
  });

  const [showButton,setShowButton] = useState(false) ; 

  const arrayPoster = ['poster','poster1'] ; 

  return (


    <div className="poster2">
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          textAlign: "center",
          width: "100%",
          top: 60,
        }}
      >
        <QuickNavigation inverted={true} />
      </div>
      <Carousel autoplay className="carousel-poster" fade>
        <div style={{ margin: 500 }}>
        
        {/* <img
            style={{
              objectFit: "cover",
              width: "100%",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              position: "absolute",
              zIndex: -1,
              objectPosition: "center",
            }}
            src="./images/banner4.jpg" 
            alt="First slide"
          /> */}



          <h1 className='title-carousel'>   </h1>


          <AnimatedText
            type='chars'
            interval={0.07}
            duration={0.8}
            animation={{
              y: '15px',
              ease: 'ease',
            }}
            className='title-carousel3'
          >
            {state.title}
          </AnimatedText>




          <AnimatedText
            type="chars" // animate words or chars
            animation={{
              x: '-30px',
              y: '200px',
              scale: 1.1,
              ease: 'ease-in-out',
            }}
            animationType="float"
            interval={0.1}
            duration={0.8}
            tag="p"
            className="title-carousel3"
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
          >

            {state.title2}
          </AnimatedText>

          <h2 className={"description-carousel"}>
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                strings: [
                  " Développez de nouvelles compétences  ",
                  "Améliorez-les avec des cours",
                  "et des certificats d'instructeurs de classe mondiale"
                ]
              }}

            />
          </h2>

       
          <Button className="explore-courses-button">
            <p>   Explorer les cours </p>
          </Button>
        
          <div
            style={{ marginTop: 30, paddingLeft: 133 }}
            className={"flex-row justify-center"}
          >
            <div className="caption-rect">
              <BusinessIcon className="captionIcon" />
              <div
                style={{ textAlign: "left", height: "100%", display: "grid" }}
              >
                <p className="captionTitle"> Business et solutions</p>
                <a href="/" className="link-rect">
                  Voir plus <MdNavigateNext />{" "}
                </a>
              </div>
            </div>
            <div className="caption-rect">
              <PersonIcon className="captionIcon" />
              <div
                style={{ textAlign: "left", height: "100%", display: "grid" }}
              >
                <p className="captionTitle">Developpement personel</p>
                <a href="/" className="link-rect">
                  Voir plus <MdNavigateNext />{" "}
                </a>
              </div>
            </div>
            <div className="caption-rect">
              <AccountBalanceIcon className="captionIcon" />
              <div
                style={{ textAlign: "left", height: "100%", display: "grid" }}
              >
                <p className="captionTitle">Education et l’enseigenement</p>
                <a href="/" className="link-rect">
                  Voir plus
                  <MdNavigateNext />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Carousel >
    </div >


  );
}

export default BannerSection;
