import './how-does-it-work.scss'
import {Typography} from "antd";

export const HowDoesItWork = () => {
  return(
      <div className={'how-does-it-work'}>
            <Typography className={'title'}>Comment ça marche?</Typography>
            <Typography className={'subtitle'}>Plannifiez le cours
                <ul>
                    <li>Ta façon d'enseigner est à toi. En plus, notre tableau de bord des instructeurs vous permet de rester organisé.
                    </li>
                </ul>
            </Typography>
          <Typography className={'subtitle'}>Enregistrez votre vidéos
              <ul>
                    <li>Utilisez les outils de base tels que les smartphones, les webcams, les caméras numériques... Tant que ça a une bonne résolution et un enregistrement de voix clair.
                    </li>
                </ul>
            </Typography>
          <Typography className={'subtitle'}>Lancez votre cours
                <ul>
                    <li>Your course will be visible on our marketplace where you will get income with every paid registration.
                    </li>
                </ul>
            </Typography>
      </div>
  )
}
