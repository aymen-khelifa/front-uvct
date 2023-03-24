import React, {useState} from 'react'
import {Empty, Input, Typography} from 'antd';
import './Panier.scss'
import { Button } from 'react-bootstrap';
import {CourseItem} from "../cours/components/course-item";
import {eventsScaffolding} from "../events/allEvents/AllEvents";
import {Link} from "react-router-dom";
import {ArrowRightAlt} from "@mui/icons-material";

function Panier() {
    const [cartEmpty,] = useState(false)

  return (
    <div className='panier'>
        <Typography className={'title'}>Panier {cartEmpty? '': '(2)'}</Typography>
        {cartEmpty?
            <div className='content-panier'>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                    height: 60,
                }}
                description={
                    <span>
                        Votre panier est vide. Continuez vos achats et trouvez un cours !
                    </span>
                }
            >
                <Link to={'/cours'}>
                    <Button className="btn-achat">Continuer vos achats</Button>
                </Link>
            </Empty>
        </div>:
            (
                <>
                {
                    eventsScaffolding.slice(0,2).map((item)=> {
                        return(
                            <CourseItem {...item}/>
                        )
                    })
                }
                <div className={'flex-row align-items-center position-relative'} style={{marginBlock: 40}}>
                    <Typography className={'promo-code'}>Avez-vous un code coupon?</Typography>
                    <Input className={'promo-code-input'}  addonAfter={<ArrowRightAlt />} placeholder={'Ecrivez ici'} />
                    <Typography className={'total-price'}>Total: 998 dt</Typography>
                </div>
                <Button className={'pay-button'}>Payer</Button>
                </>
            )
        }
    </div>
  )
}

export default Panier
