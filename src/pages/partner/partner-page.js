import {QuickNavigation} from "../../components/quick-navigation/quick-navigation";
import './partner-page.scss'
import {Button, Typography} from "antd";
import {WhyToChooseUs} from "./components/why-to-choose-us/why-to-choose-us";
import {HowDoesItWork} from "./components/how-does-it-work/how-does-it-work";
import {instructor} from "../../assets";

const PartnerPage = () => {
  return(
      <div className={'partner-page'}>
          <QuickNavigation/>
          <div className={'container'}>
              <div className={'header-section flex-row'}>
                  <div>
                      <Typography className={'title'}>Partenaire avec Uvct-Training</Typography>
                      <Typography className={'subtitle'}>Engagez-vous auprès d'un public large et
                          motivé avec vos connaissances et votre expertise.
                      </Typography>
                      <Button  href="/DevenirInstructeur" className={'become-instructor-btn'}>Devenir instructeur</Button>
                  </div>
                  <div>
                      <img
                          src={instructor}
                          className={'image'}
                       alt={'instructor'}/>
                  </div>
              </div>
          </div>
          <WhyToChooseUs/>
          <HowDoesItWork/>
      </div>
  )
}
export default PartnerPage
