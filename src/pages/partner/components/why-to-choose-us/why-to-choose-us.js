import './why-to-choose-us.scss'
import {Typography} from "antd";

export const WhyToChooseUs = () => {
  return(
      <div className={'why-to-choose-us'}>
          <div className={'overlay'}>
              <div className={'content'}>
              <Typography className={'title'}>Pourquoi enseigner sur notre platforme?</Typography>
              <Typography className={'subtitle'}>Créez des cours qui vous ressemblent
                  <ul>
                      <li>Postez le cours que vous souhaitez, comme vous le souhaitez, et gardez toujours le contrôle sur votre propre contenu.
                      </li>
                  </ul>
              </Typography>
              <Typography className={'subtitle'}>Inspirez les participants
                  <ul>
                      <li>Aidez les participants à explorer leurs intérêts, à acquérir de nouvelles compétences et à développer leur carrière.
                      </li>
                  </ul>
              </Typography>
              <Typography className={'subtitle'}>Soyez récompensé
                  <ul>
                      <li>Développez votre réseau professionnel et votre expertise, et gagnez de l'argent à chaque inscription rémunérée.
                      </li>
                  </ul>
              </Typography>
            </div>
          </div>
      </div>
  )
}
