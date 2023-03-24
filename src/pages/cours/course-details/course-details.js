import './course-details.scss'
import {QuickNavigation} from "../../../components/quick-navigation/quick-navigation";
import {Button, Collapse, Typography} from "antd";
import {StarSharp, YouTube} from "@material-ui/icons";
import React, {useState} from "react";
import {ShareOutlined, ShieldOutlined} from "@mui/icons-material";
import {UserInfo} from "../components/user-info/user-info";
import {RatingComponent} from "../components/rating-component/rating-component";
import {CommentComponent} from "../components/comment-component/comment-component";

export const CourseDetails = () => {
    const [activeAccordion, setActiveAccordion] = useState('0');

  return(
      <div className={'course-details'}>
          <div className={'gray-container'}>
            <QuickNavigation/>
              <div className={'details-container'}>
                  <div className={'left-section'}>
                      <Typography.Text className={'title'}>HR management diploma</Typography.Text><Typography.Text className={'price'}>(499 dt)</Typography.Text>
                      <br/>
                      <div className={"stars-container"}>
                          <Typography className={'course-stars'}>
                              {[1,2,3,4,5].map(()=> {
                                  return <StarSharp style={{color:'#F3CA8C'}}/>
                              })}
                          </Typography>
                          <Typography className={'stars-count'}>4.8</Typography>
                          <Typography className={'course-stars'}>{'\t'}(113 apprenants)</Typography>
                      </div>
                      <Typography className={'created-by-label'}>Crée par :</Typography>
                      <div className={'flex-row align-items-center'}>
                          <img src={'https://i.pravatar.cc/300'} className={'user-avatar'} alt={'avatar'}/>
                          <Typography className={'user-name'}>Omar Abdelrahman</Typography>
                      </div>
                      <Typography className={'package-content-label'}>Ce qui est inclu :</Typography>
                      <ul>
                          <li className={'package-content-item'}>30 lectures</li>
                          <li className={'package-content-item'}>1 ressource téléchargable</li>
                          <li className={'package-content-item'}>Accès illimité</li>
                          <li className={'package-content-item'}>Certificat de formation</li>
                      </ul>
                      <Typography className={'if-you-have-finished-course'}>Si vous terminez le cours, allez prendre votre <Typography.Text className={'course'}>certificat.</Typography.Text></Typography>
                  </div>
                  <div className={'right-section'}>
                    <video autoPlay controls height={234} width={419} src={'https://media.istockphoto.com/videos/african-american-business-holding-invisible-object-video-id473385319'}/>
                      <div className={'buttons-container'}>
                          <Button className={'add-to-cart'}>SAVE</Button>
                          <Button className={'share'} icon={<ShareOutlined style={{color:'#8D1630' }} />}></Button>
                          <Button className={'share'} icon={<ShieldOutlined style={{color:'#8D1630' }} />}></Button>
                      </div>
                  </div>
              </div>
          </div>
          <div className={'content-container'}>
              <Typography className={'description'}>Description: </Typography>
              <Typography className={'description-text'}>Le programme offre aux participants la possibilité de développer, de développer et d'utiliser des capacités adaptées à leurs besoins dans différents domaines des RH, il convient également aux participants qui souhaitent passer aux RH à partir d'un domaine connexe ou non connexe.
                  vous apprendrez à :
                  <ul>
                      <li>Augmente votre confiance professionnelle en confirmant que vous connaissez et pouvez appliquer les connaissances et pratiques de base en RH.</li>
                      <li>Vous distingue de vos pairs lorsque vous postulez à de nouvelles opportunités professionnelles.</li>
                      <li>Vous fournit les connaissances de base professionnelles et pratiques des RH.</li>
                      <li>Résultats dans un plus grand respect de la part de l'organisation dans laquelle vous travaillez.</li>
                  </ul>
              </Typography>
              <div className={'program-details'}>
                  <Typography className={'accordions-title'}>Programme du cours :</Typography>
                  <div className={'accordion'}>
                      <Collapse activeKey={activeAccordion} defaultActiveKey={activeAccordion} onChange={setActiveAccordion}>
                          {
                              courseAccordionElements.map(({title,extraDetails}, index) => {
                                  return(
                                      <Collapse.Panel header={CollapseHeader({title, extraDetails})} key={index}>
                                          {
                                              [1,2,3,4,5].map(()=> {
                                                  return(
                                                      <div className={'flex-row align-items-center space-between'}>
                                                          <Typography className={'section-title'}>
                                                              <YouTube fontSize={"small"}/>
                                                              {'\t Le programme offre aux participants la possibilité de développer, de développer '}
                                                          </Typography>
                                                          <Typography className={'section-duration'}>
                                                             20:00
                                                          </Typography>
                                                      </div>
                                                  )
                                              })
                                          }
                                      </Collapse.Panel>
                                  )
                              })
                          }
                      </Collapse>
                  </div>
              </div>
              <div className={'instructor'}>
                  <Typography className={'section-title'}>Formateur :</Typography>
                  <UserInfo/>
              </div>
              <div className={'ratings'}>
                  <Typography className={'section-title'}>Avis :</Typography>
                  <RatingComponent />
              </div>

              <div className={'comments'}>
                  {[1,2,3,4,5].map(()=> {
                      return(
                          <CommentComponent/>
                      )
                  })}
                  <Button className={'load-more-comments'}>Afficher plus d’avis</Button>
              </div>
          </div>
      </div>
  )
}


const CollapseHeader = ({title, extraDetails}) => {
    return (
        <div style={{display: "flex", justifyContent:"space-between", flexDirection:"row", width: '100%', alignItems:'center', alignSelf:"center"}}>
            <Typography className={'collapse-title'}>{title}</Typography>
            <Typography className={'collapse-hours'}>{extraDetails}</Typography>
        </div>
    )
}

const courseAccordionElements: { title:string; extraDetails: string }[] = [
    {
    title: 'Introduction aux ressources humaines',
    extraDetails: '3 lectures - 60 min'
    },
    {
    title: 'Fonctions ressources humaines',
    extraDetails: '3 lectures - 60 min'
    },
    {
    title: 'Objectifs et stratégies des ressources humaines',
    extraDetails: '3 lectures - 60 min'
    },
    {
    title: 'Analyse de travail',
    extraDetails: '3 lectures - 60 min'
    },
    {
    title: 'Recrutement',
    extraDetails: '3 lectures - 60 min'
    },
    {
    title: 'Sélection',
    extraDetails: '3 lectures - 60 min'
    },
    {
    title: 'Formation',
    extraDetails: '3 lectures - 60 min'
    },
    {
    title: 'Évaluation, paiement et compensation',
    extraDetails: '3 lectures - 60 min'
    },
]
