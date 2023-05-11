import React,{useState,useEffect} from 'react'
import {DataGrid} from '@mui/x-data-grid';
import {useSelector, useDispatch} from 'react-redux'
import DayJS from 'react-dayjs';
import { Modal, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '../../../../components/table/Table';
import  {getcommentairebyfor } from '../../../../../redux/features/commentaireSlice';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Snackbar, Alert} from "@mui/material";

const { confirm } = Modal;

function Commentaires() { 
  const commentaires= useSelector(state => state.commentaire.commentaires)
  console.log(commentaires)
  const dispatch = useDispatch()
  const {id}=useParams()
  const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
  useEffect(() => {
        
    dispatch(getcommentairebyfor(id))

          },[dispatch])
       const rowData= commentaires?.map(commentaires=> {
       return{
            id:commentaires?.uuid,
            NomSession:commentaires?.NomSession,
            Message:commentaires?.message,
            formation:commentaires?.formation.title,
            date:commentaires?.createdAt,
            envoyepar:commentaires?.user.name,
}
})

  const handleDelete = async (id) => {
    try {console.log(id)
   
       
                await axios.delete(`http://localhost:5000/commentaires/supprimercommentaires/${id}`, {
                  headers: {'X-Requested-With': 'XMLHttpRequest', 
          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
         "withCredentials": true 
              }).then((res)=>{console.log(res.data.message)
                if(res.data.message==='commentaires  supprimé ')
                {setSuccess('commentaires  supprimé ');window.location.reload()}
                if(res.data.message==='suppression echouée')
                {setErr('suppression echouée')}})
                
                
        
    } catch (err) {setErr('suppression echouée')
    }
    }



          const columns = [
            {
              field: 'Message',
              headerName: 'Commentaires',
              flex:2,
            },
            {
                field: 'envoyepar',
                headerName: 'Envoyé par',
                flex:2,
              },
              {
                field: 'formation',
                headerName: 'Formation',
                flex:1,
              },
              {
                field: 'NomSession',
                headerName: 'Session',
                flex:2,
              },
            {
              field: 'date',
              headerName: 'Date de création',
              flex:2,
            },
            {
                field: 'action',
                headerName: 'Action',
                flex:1,
                renderCell: (params) =>{
                  function showDeleteConfirm() {
                    confirm({
                      title: 'Êtes-vous sûr de vouloir supprimer ce commentaires?',
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
                  return(
                    <>  
                    <Link to={`/commentairedet/${params.row.id}`}>
                      <VisibilityIcon className='icon-action'/>
                    </Link>
                     <DeleteOutlineIcon  onClick={showDeleteConfirm} className="icon-delete"/>
                    </>
                  )
                }
              },
          ];
         
    return (   
            /*<div style={{ height: 550, width: '100%',background:"white",marginTop:"20px"}} >
              <DataGrid
                      rows={data}
                      columns={columns}
                      pageSize={8}
                      checkboxSelection
                      disableSelectionOnClick
                    />
            </div>*/
            <div className="favoris">
    <div className='formTitleContainer' style={{  backgroundColor:'white'}}>
        <h1 className="title-event" style={{  backgroundColor:'white'}} >Mes commentaires</h1>
      </div>
    <div style={{ height: 550, width: '100%' , backgroundColor:'white'}}>
    <Table row={rowData} columns={columns}/>
     </div> 
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

export default Commentaires