import React ,{useState, useEffect} from 'react'
import {fetchSessions, dispatchSessions} from '../../../../redux/actions/sessionAction'
import {useSelector, useDispatch} from 'react-redux'
import '../AddFormation.css'
import Session from './Session';

function AfficheSession(props) {
    const token = useSelector(state => state.token)
    const sessions = useSelector(state => state.sessions)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    
    useEffect(() => {
      fetchSessions(token,props.id).then(res =>{
          dispatch(dispatchSessions(res))
      })
    },[token,props.id ,dispatch, callback])

  return(
    <div>
    {
      sessions.map((session,i) => 
      (
        <div className='affiche-session' key={i+1}>
        {
          (session.section === props.id) &&
          <Session id={session._id} titre={session.title} num={i+1} description={session.description}/>
        }
        </div>
        ))}
        </div>
      
  )
}

export default AfficheSession