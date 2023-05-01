import React ,{useState, useEffect} from 'react'
import {fetchFormation, dispatchGetFormation} from '../../../../redux/actions/formationsAction'
import {fetchSections, dispatchSections} from '../../../../redux/actions/sectionAction'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import '../AddFormation.css'
import Section from './Section'
    
    
function AfficheSection() {
    const token = useSelector(state => state.token)
    const formations = useSelector(state => state.formations)
    const sections = useSelector(state => state.sections)
    const [callback, setCallback] = useState(false)
    const [callback2, setCallback2] = useState(false)
    const dispatch = useDispatch()
    const dispatch2 = useDispatch()
    //const {titre1} = useParams();
    const ref = formations._id

        useEffect(() => {
        fetchFormation(token,ref).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
        },[token,ref, dispatch, callback])
        
        useEffect(() => {
            fetchSections(token).then(res =>{
                dispatch2(dispatchSections(res))
            })
        },[token,ref ,dispatch2, callback2])
       
        
        return(
          <div>
            {
            sections.map((section,i) => 
            (
              <div className='content-section' key={i+1}>
                    <Section num={i+1}  titre={section.title} id={section._id}/>
              </div> 
            ))
           }
       </div>)
}

export default AfficheSection