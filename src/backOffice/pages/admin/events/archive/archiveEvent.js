import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {fetchArchiveEvents, dispatchGetArchiveEvents} from '../../../../../redux/actions/eventsAction'
import {fetchUserById, dispatchGetAllUserById} from '../../../../../redux/actions/usersAction'
import Avatar1 from '../../../../../components/Avatar/Avatar';
import { Modal} from 'antd';
import { Input} from 'antd';
import { List } from 'antd';
import DayJS from 'react-dayjs';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ListIcon from '@material-ui/icons/List';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Table from '../../../../components/table/Table';


const { confirm } = Modal;
const { Search } = Input;
const initialState = {
  err: '',
  success: ''
}
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
  
  function ArchiveEvent() {
  const token = useSelector(state => state.token)
  const events = useSelector(state => state.events)
  const [event, setEvent ]= useState(initialState);
  const [callback, setCallback] = useState(false)
  const [archiver, setArchiver] = useState(false)
  const { err, success} = event
  const onSearch = value => console.log(value);
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        price:event?.price,
        affiche:event?.affiche,
        postedBy:event?.postedBy,
        date:event?.dateDebut,
    }
})

    useEffect(() => {
        fetchArchiveEvents().then(res =>{
                dispatch(dispatchGetArchiveEvents(res))
            })
    },[dispatch, callback])

    const handleDelete = async (id) => {
      try {
          if(event._id !== id){
                  await axios.delete(`/deleteEvent/${id}`, {
                      headers: {Authorization: token}
                  })
                 
                  setCallback(!callback)
          }
          
      } catch (err) {
              setEvent({...event, err: err.response.data.msg, success: ''})
      }
  } 
  
    const unarchiverEvent = async(id) => {
        try {
            axios.patch(`/unarchiveEvent/${id}`,{ archiver },{
            headers: {Authorization: token}
        })
            setArchiver(false)
            setEvent({...event, err: '' , success: "Evénement unarchivé !"})
        
    }catch (err) {
            setEvent({...event, err: err.response.data.msg , success: ''})
        
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
          headerName: 'Instructeur',
          flex:2,
          renderCell: (params) =>{
            function Instructeur3(instructeur3){
                const users3 = useSelector(state => state.users)
                const [callback3, setCallback3] = useState(false)
                const dispatch3 = useDispatch()
                useEffect(() => {
                    fetchUserById(instructeur3).then(res =>{
                          dispatch3(dispatchGetAllUserById(res))
                      })
                },[dispatch3,instructeur3, callback3])
                return users3
            }
            return(
                <> 
                
                </>
            )
          }
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
            flex:2,
            renderCell: (params) =>{
                function showDeleteConfirm() {
                    confirm({
                      title: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
                      icon: <ExclamationCircleOutlined />,
                      okText: 'Supprimer',
                      okType: 'danger',
                      cancelText: 'Annuler',
                      closable:true,
                      onOk() {
                        handleDelete(params.row.id)
                      },
                      onCancel() {
                        console.log('Cancel');
                      },
                    });
                  }
                  function showUnArchiveConfirm() {
                    confirm({
                      title: 'Êtes-vous sûr de vouloir unarchiver cet événement ?',
                      icon: <ExclamationCircleOutlined />,
                      okText: 'Unarchiver',
                      okType: 'danger',
                      cancelText: 'Annuler',
                      closable:true,
                      onOk() {
                        unarchiverEvent(params.row.id)
                      },
                      onCancel() {
                        console.log('Cancel');
                      },
                    });
                  }
              return(
                <>
                    <VisibilityIcon  className='icon-action'/>
                    <UnarchiveIcon className='icon-action' onClick={showUnArchiveConfirm}/>
                    <DeleteOutlineIcon onClick={showDeleteConfirm} className="icon-delete"/>    
                </>
              )
            }
          },
      ];
  return (
    <>
        <div style={{ height: 550, width: '100%'}}>
        <Table row={rowData} columns={columns}/>
        </div> 
        <Modal title="Participants" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Search placeholder="Rechercher des participants" allowClear onSearch={onSearch}  />
            <List
                dataSource={participants}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar1 src="https://joeschmoe.io/api/v1/random" />}
                    title={item.title}
                    description={item.date}
                    />
                </List.Item>
                )}
            />
        </Modal>
    </> 
  )
}
export default ArchiveEvent