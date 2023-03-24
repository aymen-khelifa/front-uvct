import {Button, Typography} from "antd";
import './know-more.scss'

export const KnowMore = () => {
  return (
      <div className={'know-more'}>
          <Typography className={'text'}>En savoir plus sur nous</Typography>
          <Button className={'button'}>À propos de nous</Button>
      </div>
  )
}
