import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {fetchMyEvents, dispatchGetMyEvents} from '../../../../redux/actions/eventsAction'
import { Modal} from 'antd';
import { Input, Button} from 'antd';
import { List, Avatar } from 'antd';
import DayJS from 'react-dayjs';
import ArchiveIcon from '@material-ui/icons/Archive';
import ListIcon from '@material-ui/icons/List';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '../../../components/table/Table';
import SnackbarErr from '../../../components/Snackbar/SnackbarErr';
import { Link } from 'react-router-dom';

const initialState = {
  err: '',
  success: ''
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const { Search } = Input;
const participants = [
    { 
      title: 'Phillip Baptista',
      date:'14 avril, 20:21'
    },
    {   
        title: 'Phillip Baptista',
        date:'14 avril, 20:21'

      },
    
  ];
  const onSearch = value => console.log(value);
  
function MesEvents() {
    const auth = useSelector(state => state.auth)
    const {isInstr} = auth
    const token = useSelector(state => state.token)
    const events = useSelector(state => state.events)
    const [event, setEvent ]= useState(initialState);
    const [callback, setCallback] = useState(false)
    const { err, success} = event
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()

      const showModal = () => {
        setIsModalVisible(true);
      };

      const handleOk = () => {
        setIsModalVisible(false);
      };

      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const rowData= events?.map(event => {
        return{
            id:event?._id,
            title:event?.title,
            affiche:event?.affiche,
            date:event?.dateStart,
        }
      })

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

      useEffect(() => {
              fetchMyEvents(token).then(res =>{
                  dispatch(dispatchGetMyEvents(res))
              })
      },[token, dispatch, callback])

      const handleDelete = async (id) => {
        try {
            if(event._id !== id){
                    await axios.delete(`/deleteEvent/${id}`, {
                        headers: {Authorization: token}
                    })
                  
                    setCallback(!callback)
                    setOpen(true);
            }
            
        } catch (err) {
                setEvent({...event, err: err.response.data.msg, success: ''})
                setOpen2(true);
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
            flex:1,
          },
          {
            field: 'date',
            headerName: 'Date',
            flex:2,
            renderCell(params){
              return(
                <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
              );
            }
          },
          {
            field: 'participant',
            headerName: 'Participants',
            flex:2,
            renderCell(params){
              return(
                <ListIcon onClick={showModal} className='icon-action'/>
              );
            }
          },
          {
              field: 'action',
              headerName: 'Action',
              flex:1,
              renderCell: (params) =>{
                return(
                  <>  
                  <Link to={`/events/${params.row.id}`}>
                          <VisibilityIcon className='icon-action'/>
                    </Link>
                      <ArchiveIcon className='icon-action'/>
                      <DeleteOutlineIcon onClick={() => handleDelete(params.row.id)} className="icon-delete"/>
                  </>
                )
              }
            },
        ];

  return (
<div className={`${isInstr ? "favoris":""} `}>
{
      isInstr && (
        <div className='formTitleContainer'>
        <h3 className="title-event">Mes événements</h3>
        <Button  href="/ajout-evenement">
         <AddIcon />Ajouter événement</Button>
      </div>
      )
    }
  <div style={{ height: 550, width: '100%' , backgroundColor:'white'}}>
    <Table row={rowData} columns={columns}/>
  </div> 
      <Modal title="Participants" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
   <Search placeholder="Rechercher des participants" allowClear onSearch={onSearch}  />
      <List
          dataSource={participants}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.title}
                description={item.date}
              />
            </List.Item>
          )}
        />
      </Modal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
  <SnackbarErr err={err} open2={open2}/>
</div>
     
  )
}

export default MesEvents