import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { Button ,Modal ,Form } from 'react-bootstrap';
import AllCoupons from './allCoupons/AllCoupons';
import { useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { Snackbar, Alert} from "@mui/material";


const initialState = {
  code:'', 
  number:'',
  discount:'',
  dateStart:'',
  dateEnd:'',
  err: '',
  success: ''
}

function Coupons() {
    const token = useSelector(state => state.token)
    const [coupon, setCoupon ]= useState(initialState);
    //const { code,number,discount,dateStart,dateEnd} = coupon
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {id} = useParams()
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState(false);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [discount, setDiscount] = useState("");
  const [discountError, setDiscountError] = useState(false);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  
  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  }
  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  }


    const handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen1(false);
      };

    const handleChangeInput = e => {
      const {name, value} = e.target
      setCoupon({...coupon, [name]:value, err: '', success: ''})
    }

    const handleCodeChange = (event) => {
      const { value } = event.target;
      setCode(value);
      setCodeError(value.length < 3 );
    };
    const handleNumberChange = (event) => {
      const { value } = event.target;
      setNumber(value);
    };
    const handleDiscountChange = (event) => {
      const { value } = event.target;
      setDiscount(value);
    
    };
   
   

    const handleSubmit = async e => {
      e.preventDefault()
      try {console.log(id)
           await axios.post(`http://localhost:5000/coupons/addcoupon/${id}`, {
            code:code,
            number:number,
            discount:discount,
            dateStart:dateStart,
            dateEnd:dateEnd
          },{
           // headers: {Authorization: token}
           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        }).then((res)=>{console.log(res.data.message)
          if(res.data.message==='coupons ajouté !')
          {setSuccess('coupons ajouté !');window.location.reload()}
          if(res.data.message==='deja existe')
          {setErr('deja existe')}})
      } catch (err) {
        setErr('erreur')
      }
}



  return (
    <div className="coupon">
      <Button className='btn-event' onClick={handleShow}><AddIcon />Ajouter un nouveau coupon</Button>
      <AllCoupons />
      <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
          <Form.Group className="mb-3" >
            <Form.Label className="label">Pourcentage de remise</Form.Label>
            <Form.Select    
                required 
                name="discount"
                
                onChange={handleDiscountChange} 
                >
                <option value="5%">5%</option>
                <option value="10%">10%</option>
                <option value="15%">10%</option>
                <option value="20%">10%</option>
        </Form.Select>
          </Form.Group>
         
          <Form.Group className="mb-3" >
            <Form.Label className="label">Code de coupon</Form.Label>
            <Form.Control type="text"
            placeholder="Entrez votre code"
            name="code"
            
            onChange={handleCodeChange}
              isInvalid={codeError}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nombre de remises</Form.Label>
            <Form.Control type="number"
            placeholder="100"
            name="number"
            
            onChange={handleNumberChange} 
            isInvalid={numberError}
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Valable après</Form.Label>
            <Form.Control //type="datetime-local"
                name="dateStart"
                type='date'
                onChange={handleDateStartChange}
              
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Valable jusqu'au</Form.Label>
            <Form.Control //type="datetime-local"
                name="dateEnd"
                type='date'
                onChange={handleDateEndChange}  
                required  />
          </Form.Group>
          <Button className='btn-annnuler' onClick={handleClose}>
            Annuler
          </Button>
          <Button className='btn-confirme' type="submit" onClick={handleSubmit}>
            Créer
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Snackbar autoHideDuration={1500} open={ err === "" ? false : true } onClose={()=>{ setErr("") }}  >
        <Alert variant="filled" severity="error" onClose={()=>{ setErr("") }} >
          {
            err
          }
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={1500} open={ success === "" ? false : true } onClose={()=>{ setSuccess("") }}  >
        <Alert variant="filled" severity="success" onClose={()=>{ setSuccess("") }} >
          {
            success
          }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Coupons