import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchMyFormations, dispatchGetMyFormations} from '../../../redux/actions/formationsAction'
import { Button,Form ,Modal,Nav} from 'react-bootstrap'
import {Input} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import "./Formation.css"
import { useNavigate } from 'react-router-dom';
import DayJS from 'react-dayjs';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const { Search } = Input;
const onSearch = value => console.log(value);
const initialState = {
  title:'',
  err: '',
  success: ''
}
function Formations() {
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open4 = Boolean(anchorEl1);
  const id= open4 ? 'simple-popover' : undefined;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = useSelector(state => state.token)
  const [formation, setFormation] = useState(initialState)
  const [archiver, setArchiver] = useState(false)
  const [statut, setStatut] = useState(false)
  const formations = useSelector(state => state.formations)
  const {title, err, success} = formation
  const navigate = useNavigate();
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  const [currentRow, setCurrentRow] = useState(null);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const data= formations?.map(formation => {
    return{
        id:formation?._id,
        title:formation?.title,
        price:formation?.price,
        affiche:formation?.affiche,
        statut:formation?.statut,
        date:formation?.createdAt,
        inscription:0,
    }
  })

        const handleClose2 = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen2(false);
        };

        const handleClose3 = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen3(false);
          };

        const handleClick = (event) => {
                setAnchorEl1(event.currentTarget);
        };

        const handleClose4 = () => {
                setAnchorEl1(null);
        };

        useEffect(() => {
                  fetchMyFormations(token).then(res =>{
                        dispatch(dispatchGetMyFormations(res))
                    })
        },[token, dispatch, callback])

        const handleChangeInput = e => {
                const {name, value} = e.target
                setFormation({...formation, [name]:value, err: '', success: ''})
        }

        const handleSubmit = async e => {
              e.preventDefault()
              try {
                  const res = await axios.post('/addFormation', {
                    title
                  },{
                    headers: {Authorization: token}
                })
                  setFormation({...formation, err: '', success: res.data.msg})
                  navigate(`/formation/${formation.title}`);
                  setOpen2(true);

              } catch (err) {
                  err.response.data.msg && 
                  setFormation({...formation, err: err.response.data.msg, success: ''})
                  setOpen3(true);
              }
        }

        const handleDelete = async (id) => {
          try {
              if(formation._id !== id){
                      await axios.delete(`/deleteFormation/${id}`, {
                          headers: {Authorization: token}
                      })
                      setCallback(!callback)
              }
            }   catch (err) {
              setFormation({...formation, err: err.response.data.msg , success: ''})
              setOpen3(true);
          }
          } 

          const archiverFormation = async(id) => {
            try {
              if(formation._id !== id){
                axios.patch(`/archiveFormation/${id}`,{archiver},{
                  headers: {Authorization: token}
              })
                setFormation({...formation, err: '' , success: "Formation archivé !"})
                setArchiver(true)
                setOpen2(true);
                window.location.reload(false);
              
         } }catch (err) {
                setFormation({...formation, err: err.response.data.msg , success: ''})
                setOpen3(true);
              
            }
          }

          const publierFormation = async(id) => {
            try {
              if(formation._id !== id){
                axios.patch(`/publierFormation/${id}`,{statut},{
                  headers: {Authorization: token}
              })
                setFormation({...formation, err: '' , success: "Formation publié !"})
                setStatut(true)
                setOpen2(true);
                window.location.reload(false);
              
         } }catch (err) {
                setFormation({...formation, err: err.response.data.msg , success: ''})
                setOpen3(true);
              
            }
          }

          const depublierFormation = async(id) => {
            try {
              if(formation._id !== id){
                axios.patch(`/depublierFormation/${id}`,{statut},{
                  headers: {Authorization: token}
              })
                setFormation({...formation, err: '' , success: "Formation dépublié !"})
                setStatut(false)
                setOpen2(true);
                window.location.reload(false);
              
         } }catch (err) {
                setFormation({...formation, err: err.response.data.msg , success: ''})
                setOpen3(true);
              
            }
          }

        const columns = [
          {
            field: 'affiche',
            headerName: 'Miniature',
            flex:1,
            renderCell: (params) =>{
              return(
                <> 
                    <img src={params.row.affiche} alt="" className='miniature'/>    
                </>
              )
            }
          },
          {
            field: 'title',
            headerName: 'Titre',
            flex:2,
          },
          {
            field: 'date',
            headerName: 'Date de création',
            flex:2,
            renderCell(params){
              return(
                <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
                
              );
            }
          },
          {
            field: 'price',
            headerName: 'Prix',
            flex:1,
          },
          {
            field: 'inscription',
            headerName: 'Inscriptions',
            flex:1,
          },
          {
            field: 'statut',
            headerName: 'Status',
            flex:1,
            sorting:false,
            renderCell: (params) =>{
              return(
                <div className={`${params.row.statut ? "status-formation1" : "status-formation2"}`}> 
                {
                  params.row.statut ? 
                  <p className='p-formation'>PUBLIÉ</p> :
                  <p className='p-formation'>INÉDIT</p>
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
                  <a href={`/maFormation/${params.row.title}`}><VisibilityIcon className='icon-action'/></a>
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
                          <Nav.Link className="actionNav" onClick={() => depublierFormation(currentRow.id)}>Dépublier formation</Nav.Link>
                         :
                         <Nav.Link className="actionNav" onClick={() => publierFormation(currentRow.id)}>Publier formation</Nav.Link>
                        }
                        <Divider />
                        <Nav.Link className="actionNav" onClick={() => archiverFormation(params.row.id)}>Archiver formation</Nav.Link>
                        <Divider />
                        <Nav.Link className="actionNav" onClick={() => handleDelete(currentRow.id)}>Supprimer formation</Nav.Link>
                    </Popover>     
                  </>
                )
              }
            },
        ];

  return (
    <div className='formation'>
      <div className='formTitleContainer'>
        <h1 className="title-event">Mes formations</h1>
        <Button className='btn-event' onClick={handleShow}>
         <AddIcon />Formation</Button>
      </div>
      <div className="search">
      <Search placeholder="Rechercher des formations" allowClear onSearch={onSearch}  />
      </div>
          <div style={{ height: 550}} className="tableau" >
            <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={8}
                    isRowSelectable={(params) => setCurrentRow(params.row)}
                  />
          </div>
       <Modal show={show} onHide={handleClose} centered>
       <Modal.Header closeButton>
          <Modal.Title>Nommez votre formation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Quel nom désirez-vous donner à votre formation ?</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
             <Form.Control type="text" 
              placeholder="par exemple “Stratégies marketing avancées”"
              name="title"
              value={title}
              onChange={handleChangeInput} 
              required
              />
            </Form.Group>
            <Button className='btn-annnuler' onClick={handleClose}>
            Annuler
          </Button>
          <Button className='btn-confirme' type="submit">
            Continuer
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
        <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'  }}>
                <Alert onClose={handleClose2} severity="success">
                {success}
                </Alert>
        </Snackbar>
        <Snackbar open={open3} autoHideDuration={6000} onClose={handleClose3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose3} severity="error">
                {err}
                </Alert>
        </Snackbar>
    </div>
  )
}

export default Formations