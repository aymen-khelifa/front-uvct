import {Typography} from "antd";
import './user-info-component.scss'

export const UserInfoComponent = ({postedBy}) => {
  return(
      <div className={'user-info-component'}>
        <img className={'user-avatar'} src={'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg'} alt={'user'}/>
        <div>
            <Typography className={'created-by'}>Organisé par</Typography>
            <Typography className={'content-creator'}>{postedBy}</Typography>
        </div>
      </div>
  )
}
