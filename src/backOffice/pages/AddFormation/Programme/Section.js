import React ,{useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import AfficheSession from './AfficheSession';
import AddSession from './AddSession';
import '../AddFormation.css'
import UpdateSection from './UpdateSection'
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

    const sectionState = {
    title:'',
    formation:'',
    objectif:'',
    err: '',
    success: ''
    }

function Section(props) {
    const token = useSelector(state => state.token)
    const [session, setSession] = useState(false)
    const [edit, setEdit] = useState(false)
    const [modifier, setModifier] = useState(false)
    const [section, setSection] = useState(sectionState)
    const [callback3, setCallback3] = useState(false)

        const handleDelete = async () => {
            try {
                        await axios.delete(`/deleteSection/${props.id}`, {
                            headers: {Authorization: token}
                        })
                        setCallback3(!callback3)
              }   catch (err) {
                setSection({...section, err: err.response.data.msg , success: ''})
            }
            } 

            function showDeleteConfirm() {
              confirm({
                title: 'Êtes-vous sûr de vouloir supprimer cette section?',
                icon: <ExclamationCircleOutlined />,
                okText: 'Supprimer',
                okType: 'danger',
                cancelText: 'Annuler',
                closable:true,
                onOk() {
                  handleDelete()
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
            }
            
  return (
    <div>
         <div onMouseEnter={() => setEdit(true)}  onMouseLeave={() => setEdit(false)} >
                    Section {props.num}:  
                    <DescriptionIcon className="icon-prog" />
                    {props.title}
                    {edit && (
                      <>
                      <EditIcon className="icon-prog" onClick={() => setModifier(true)}/> 
                      <DeleteOutlineIcon className="icon-prog" onClick={showDeleteConfirm}/>
                    </>)
                    }</div>
                    {
                      modifier && (
                      <div className='content-section'>
                        <CloseIcon onClick={() => setModifier(!modifier)} className="icon-add"/>
                          <UpdateSection  id={props.id} num={props.num}/>
                      </div>
                      )  
                  }

                    <AfficheSession id={props.id}/>

                    {
                      session && (
                      <div className='content-section'>
                        <CloseIcon onClick={() => setSession(!session)} className="icon-add"/>
                          <AddSession  id={props.id} />
                      </div>
                      )  
                   }
                    <div className='btn-add-session' onClick={() => setSession(!session)}>
                      <p><AddCircleOutlineIcon className='icon-add' />Ajouter session</p>
                    </div>
    </div>
  )
}

export default Section