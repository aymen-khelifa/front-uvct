import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {fetchCoupons, dispatchCoupons} from '../../../../../../redux/actions/couponAction'
import {fetchFormation, dispatchGetFormation} from '../../../../../../redux/actions/formationsAction'
import {DataGrid} from '@mui/x-data-grid';
import DayJS from 'react-dayjs';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'

const initialState = {
     code:'', 
     nbRemise:'',
     remise:'',
     dateDebut:'',
     dateFin:'',
     err: '',
     success: ''
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
function AllCoupons() {
    const token = useSelector(state => state.token)
    const coupons = useSelector(state => state.coupons)
    const formations = useSelector(state => state.formations)
    const [coupon, setCoupon ]= useState(initialState);
    const [callback, setCallback] = useState(false)
    const [callback1, setCallback1] = useState(false)
    const { code,nbRemise,remise,dateDebut,dateFin,err, success} = coupon
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const dispatch = useDispatch()
    const dispatch1 = useDispatch()
    const {titre1} = useParams()
    const [show2, setShow2] = useState(false);
    const [statut, setStatut] = useState(false);
    const handleClose1 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open4 = Boolean(anchorEl1);
    const id= open4 ? 'simple-popover' : undefined;
    const rowData= coupons?.map(coupon => {
        return{
            id:coupon?._id,
            code:coupon?.code,
            remise:coupon?.remise,
            dateFin:coupon?.dateFin,
            nbRemise:coupon?.nbRemise,
            statut:coupon?.statut,
        }
      })

      const handleClick = (event) => {
        setAnchorEl1(event.currentTarget);
      };

      const handleClose4 = () => {
        setAnchorEl1(null);
      };
      
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen2(false);
      };
   
      useEffect(() => {
        fetchFormation(token,titre1).then(res =>{
            dispatch1(dispatchGetFormation(res))
        })
    },[token,titre1,dispatch1, callback1])

      useEffect(() => {
        fetchCoupons(token,formations._id).then(res =>{
            dispatch(dispatchCoupons(res))
        })
    },[token,formations._id,dispatch, callback])
     
      const handleDelete = async (id) => {
        try {
            if(coupon._id !== id){
                    await axios.delete(`/deleteCoupon/${id}`, {
                        headers: {Authorization: token}
                    })
                  
                    setCallback(!callback)
                    setOpen(true);
            }
            
        } catch (err) {
                setCoupon({...coupon, err: err.response.data.msg, success: ''})
                setOpen2(true);
        }
      } 

      const activerCoupon = async(id) => {
        try {
          if(coupon._id !== id){
            axios.patch(`/activerCoupon/${id}`,{statut},{
              headers: {Authorization: token}
          })
            setCoupon({...coupon, err: '' , success: "Coupon activé !"})
            setStatut(true)
            setOpen(true);
          
     } }catch (err) {
            setCoupon({...coupon, err: err.response.data.msg , success: ''})
            setOpen2(true);
          
        }
      }

      const desactiverCoupon = async(id) => {
        try {
          if(coupon._id !== id){
            axios.patch(`/desactiverCoupon/${id}`,{statut},{
              headers: {Authorization: token}
          })
            setCoupon({...coupon, err: '' , success: "Coupon désactivé !"})
            setStatut(false)
            setOpen(true);
          
     } }catch (err) {
            setCoupon({...coupon, err: err.response.data.msg , success: ''})
            setOpen2(true);
          
        }
      }

      const handleChange = e => {
        const {name, value} = e.target
        setCoupon({...coupon, [name]:value, err:'', success: ''})
    }

      const updateInfor = async() => {
      try {
          axios.patch(`/updateCoupon/${coupon._id}`, {
            code: code ? code : coupon.code,
            remise : remise ? remise : coupon.remise,
            nbRemise : nbRemise ? nbRemise : coupon.nbRemise, 
            dateDebut : dateDebut ? dateDebut : coupon.dateDebut, 
            dateFin : dateFin ? dateFin : coupon.dateFin, 
          }, { headers: {Authorization: token} })
          setCoupon({...coupon, err: '' , success: "Success!"})
          setOpen(true)
        
        } catch (err) {
              setCoupon({...coupon, err: err.response.data.msg , success: ''})
              setOpen2(true)
          }
      }

      const handleUpdate = () => {
          updateInfor()
      }
  
      const columns = [
          {
            field: 'code',
            headerName: 'Code',
            flex:1,
          },
          {
            field: 'remise',
            headerName: 'Remise',
            flex:1,
          },
          {
            field: 'nbRemise',
            headerName: 'Copons Restants',
            flex:2,
          },
          {
            field: 'dateFin',
            headerName: 'Expire',
            flex:2,
            renderCell(params){
              return(
                <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
              );
            }
          },
          {
            field: 'statut',
            headerName: 'Statut',
            flex:1,
            renderCell: (params) =>{
              return(
                <div className={`${params.row.statut ? "status-formation1" : "status-formation2"}`}> 
                {
                  params.row.statut ? 
                  <p className='p-formation'>ACTIVÉ</p> :
                  <p className='p-formation'>DÉSACTIVÉ</p>
                }
                </div>
              )
            }
          },
          {
              field: 'action',
              headerName: 'Action',
              flex:1,
              renderCell: (params) =>{
                return(
                  <>  
                  <VisibilityIcon className='icon-action' onClick={handleShow2}/>
                    <Modal show={show2} onHide={handleClose1}>
                         <Modal.Header closeButton>
                          <Modal.Title>Modifier coupon</Modal.Title>
                        </Modal.Header>
                      <Modal.Body>
                        <Form >
                        <Form.Group className="mb-3" >
                          <Form.Label className="label">Pourcentage de remise</Form.Label>
                          <Form.Select    
                              required 
                              name="remise"
                              defaultValue={coupon.remise}
                              onChange={handleChange} 
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
                          defaultValue={coupon.code}
                          onChange={handleChange} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="label">Nombre de remises</Form.Label>
                          <Form.Control type="number"
                          placeholder="100"
                          name="nbRemise"
                          defaultValue={coupon.nbRemise}
                          onChange={handleChange} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="label">Valable après</Form.Label>
                          <Form.Control type="datetime-local"
                              name="dateDebut"
                              defaultValue={coupon.dateDebut}
                              onChange={handleChange} 
                              required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="label">Valable jusqu'au</Form.Label>
                          <Form.Control type="datetime-local"
                              name="dateFin"
                              defaultValue={coupon.dateFin}
                              onChange={handleChange}   
                              required  />
                        </Form.Group>
                        <Button className='btn-annnuler' onClick={handleClose1}>
                          Annuler
                        </Button>
                        <Button className='btn-confirme' onClick={handleUpdate}>
                          Modifier
                        </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                      <Button aria-describedby={id} className="btn-action" onClick={handleClick}>⋮</Button>
                    <Popover
                          id={id}
                          open={open4}
                          anchorEl={anchorEl1}
                          onClose={handleClose4}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                        {
                          params.row.statut ?
                          <Nav.Link className="actionNav" onClick={() => desactiverCoupon(params.row.id)}>Désactivé coupon</Nav.Link>:
                          <Nav.Link className="actionNav" onClick={() => activerCoupon(params.row.id)}>Activé coupon</Nav.Link>
                        }
                        <Divider />
                        <Nav.Link className="actionNav" onClick={() => handleDelete(params.row.id)}>Supprimer coupon</Nav.Link>
                    </Popover>     
                  </>
                )
              }
            },
        ];

  return (
  <div style={{ height: 550, width: '100%' , backgroundColor:'white', marginTop:'20px'}}>
      <DataGrid
              rows={rowData}
              columns={columns}
              pageSize={8}
              disableSelectionOnClick 
            />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose2} severity="error">
          {err}
        </Alert>
      </Snackbar>
  </div>
     
  )
}

export default AllCoupons