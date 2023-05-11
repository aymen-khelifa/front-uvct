import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {fetchCoupons, dispatchCoupons} from '../../../../../../../redux/actions/couponAction'
import {fetchFormation, dispatchGetFormation} from '../../../../../../../redux/actions/formationsAction'
import {DataGrid} from '@mui/x-data-grid';
import DayJS from 'react-dayjs';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Modal as Modal1} from 'antd';

import { useParams } from 'react-router-dom';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import { getcouponbyfor } from '../../../../../../../redux/features/couponSlice';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from "@mui/material/Tooltip";
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Snackbar,Alert} from "@mui/material";


const { confirm } = Modal1;

function AllCoupons() {
    const token = useSelector(state => state.token)
    const coupons = useSelector(state => state.couponSlice.coupon)
    const formations = useSelector(state => state.formations)
    const [callback, setCallback] = useState(false)
    const [callback1, setCallback1] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const dispatch = useDispatch()
    const dispatch1 = useDispatch()
    const {id} = useParams()
    const [show2, setShow2] = useState(false);
    const [statut, setStatut] = useState(false);
    const handleClose1 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const open4 = Boolean(anchorEl1);
    //const id= open4 ? 'simple-popover' : undefined;
  console.log(coupons)
    const rowData= coupons?.map(coupon => {
        return{
            id:coupon.uuid,
            code:coupon.code,
            remise:coupon.discount,
            dateFin:coupon.dateEnd,
            nbRemise:coupon.number,
            status:coupon.status,
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
        
            dispatch(getcouponbyfor(id))
        
    },[dispatch])
     
      const handleDelete = async (id) => {
        try {
          
                   const res= await axios.delete(`http://localhost:5000/coupons/deletecoupon/${id}`, {
                        //headers: {Authorization: token}
                        headers: {'X-Requested-With': 'XMLHttpRequest', 
                        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                       "withCredentials": true 
                    });if(res.data.message==='coupon supprimé !')
                    {setSuccess('coupon supprimé !');window.location.reload()}
                    if(res.data.message==='suppression echouée')
                    {setErr('suppression echouée')}
                  
                    
            
        } catch (err) {
          setErr('erreur')
        }
      } 

      const activerCoupon = async(id) => {
        try {
           
          const res= axios.patch(`http://localhost:5000/coupons/activercoupon/${id}`,{
             // headers: {Authorization: token}
              headers: {'X-Requested-With': 'XMLHttpRequest', 
              "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true 
          });console.log(res.data.message);
          if(res.data.message==='coupon activé')
                    {setSuccess('coupon activé');window.location.reload()}
                    if(res.data.message==='deja activé ')
                    {setErr('deja activé ');}
                    else {setErr('activation echouée')} 
           
          
      }catch (err) {
        setErr('activation echouée')
          
        }
      }

      const desactiverCoupon = async(id) => {
        try {
          
          const res= axios.patch(`http://localhost:5000/coupons/desactivercoupon/${id}`,{
              //headers: {Authorization: token}
              headers: {'X-Requested-With': 'XMLHttpRequest', 
              "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true 
          });
          if(res.data.message==='coupon desactivé');
                    {setSuccess('coupon desactivé');window.location.reload()}
                    if(res.data.message==='deja desactivé ')
                    {setErr('deja desactivé ')}
                    else {setErr('erreur')}
            
          
      }catch (err) {
        setErr('erreur')
          
        }
      }

    

     /* const updateInfor = async(id) => {
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
      }*/

     /* const handleUpdate = () => {
          updateInfor()
      }*/
  
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
            headerName: 'nbRemise',
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
            field: 'status',
            headerName: 'Status',
            flex:1,
           
          },
          {
              field: 'action',
              headerName: 'Action',
              flex:1,
              renderCell: (params) =>{function showDeleteConfirm() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir supprimer ce coupon?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'Supprimer',
                  okType: 'danger',
                  cancelText: 'Annuler',
                  onOk() {
                    handleDelete(params.row.id)
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              function showactiverConfirm() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir activer ce coupon?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'activer',
                  okType: 'primary',
                  cancelText: 'Annuler',
                  onOk() {
                    activerCoupon(params.row.id)
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }function showdesactiverConfirm() {
                confirm({
                  title:'Êtes-vous sûr de vouloir desactiver ce coupon?',
                  icon: <CheckCircleOutlineIcon className="iconCheck"/>,
                  okText: 'desactiver',
                  okType: 'primary',
                  cancelText: 'Annuler',
                  onOk() {
                    desactiverCoupon(params.row.id) 
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
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
                              //defaultValue={coupon.remise}
                             // onChange={handleChange} 
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
                         // defaultValue={coupon.code}
                          //onChange={handleChange} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="label">Nombre de remises</Form.Label>
                          <Form.Control type="number"
                          placeholder="100"
                          name="nbRemise"
                          //defaultValue={coupon.nbRemise}
                          //onChange={handleChange} 
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="label">Valable après</Form.Label>
                          <Form.Control type="datetime-local"
                              name="dateDebut"
                             // defaultValue={coupon.dateDebut}
                            //  onChange={handleChange} 
                              required/>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                          <Form.Label className="label">Valable jusqu'au</Form.Label>
                          <Form.Control type="datetime-local"
                              name="dateFin"
                             // defaultValue={coupon.dateFin}
                            //  onChange={handleChange}   
                              required  />
                        </Form.Group>
                        <Button className='btn-annnuler' onClick={handleClose1}>
                          Annuler
                        </Button>
                        <Button className='btn-confirme' //onClick={handleUpdate}
                         > Modifier
                        </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                     
                    <Tooltip title="bloquer">
                 <BlockIcon className='icon-action' onClick={showdesactiverConfirm} />
                 </Tooltip>
                 <Tooltip title="activer">
                 <LockOpenIcon className='icon-action' onClick={showactiverConfirm} />
                 </Tooltip>
                 <Tooltip title="supprimer">
                 <DeleteOutlineIcon className='icon-action' onClick={showDeleteConfirm} />
                 </Tooltip>   
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

export default AllCoupons