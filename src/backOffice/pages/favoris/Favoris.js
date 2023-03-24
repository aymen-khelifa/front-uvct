import React from 'react'
import './Favoris.css'
import CourseFavori from './component/CourseFavori';

function Favoris() {
  return (
    <div className="favoris">
    <h1 className="title-favoris1">Mes favoris</h1>
    <div style={{ height: 550, width: '100%' , backgroundColor:'white'}} className="course-favoris">
    <CourseFavori image="https://picsum.photos/200/300?random=2"
    name="HR management diploma"
    contentCreator="Abdelharmen Omar"
    />
     </div> 
    </div>
  )
}

export default Favoris