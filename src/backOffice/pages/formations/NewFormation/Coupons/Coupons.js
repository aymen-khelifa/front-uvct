import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import axios from 'axios'
import { Button ,Modal ,Form } from 'react-bootstrap';
import AllCoupons from './allCoupons/AllCoupons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
    const { code,number,discount,dateStart,dateEnd,err, success} = coupon
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {id} = useParams()

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

    const handleSubmit = async e => {
      e.preventDefault()
      try {
          const res = await axios.post(`/ajoutCoupon/${id}`, {
            code,number,discount,dateStart,dateEnd
          },{
            headers: {Authorization: token}
        })
          setCoupon({...coupon, err: '', success: res.data.msg})
          setOpen(true);
          window.location.reload(false);

      } catch (err) {
          err.response.data.msg && 
          setCoupon({...coupon, err: err.response.data.msg, success: ''})
          setOpen1(true);
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
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Pourcentage de remise</Form.Label>
            <Form.Select    
                required 
                name="discount"
                value={discount}
                onChange={handleChangeInput} 
                >
                <option value="5%">5%</option>
                <option value="10%">10%</option>
        </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" >
                <Form.Check 
                type="switch"
                id="custom-switch"
                label="Remise privée"
                />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Code de coupon</Form.Label>
            <Form.Control type="text"
            placeholder="Entrez votre code"
            name="code"
            value={code}
            onChange={handleChangeInput} 
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nombre de remises</Form.Label>
            <Form.Control type="number"
            placeholder="100"
            name="number"
            value={number}
            onChange={handleChangeInput} 
            />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Valable après</Form.Label>
            <Form.Control type="datetime-local"
                name="dateStart"
                value={dateStart}
                onChange={handleChangeInput} 
                required/>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Valable jusqu'au</Form.Label>
            <Form.Control type="datetime-local"
                name="dateEnd"
                value={dateEnd}
                onChange={handleChangeInput}  
                required  />
          </Form.Group>
          <Button className='btn-annnuler' onClick={handleClose}>
            Annuler
          </Button>
          <Button className='btn-confirme' type="submit">
            Créer
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose2}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={handleClose2} severity="success">
                {success}
                </Alert>
        </Snackbar>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
                <Alert onClose={handleClose3} severity="error">
                {err}
                </Alert>
        </Snackbar>
    </div>
  )
}

export default Coupons