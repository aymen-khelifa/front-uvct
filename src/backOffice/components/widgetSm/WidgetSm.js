import "./WidgetSm.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
export default function WidgetSm() {
  return (
    <div className="widgetSm">
    <span className="widgetSmTitle"> Nouvelle candidature</span>
    <ul className="widgetSmList">
      <li className="widgetSmListItem">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBAyGmCfSr4dw020wYF7U5nYAybqWpbPPVXw&usqp=CAU" 
        className="widgetSmImage"
        alt=""></img>
        <div className="widgetSmUser">
          <span className="widgetSumUsername">Anna keller</span>
          <span className="widgetSumUserTitle">Software Engineer</span>
        </div>
        <a href="/candidature">
        <button className="widgetSumButton" >
            <VisibilityIcon className="widgetSmIcon" />
            Display
        </button>
        </a>
      </li>
      <li className="widgetSmListItem">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBAyGmCfSr4dw020wYF7U5nYAybqWpbPPVXw&usqp=CAU"
          className="widgetSmImage"
        alt=""></img>
        <div className="widgetSmUser">
          <span className="widgetSumUsername">Anna keller</span>
          <span className="widgetSumUserTitle">Software Engineer</span>
        </div>
        <a href="/candidature">
        <button className="widgetSumButton" >
            <VisibilityIcon className="widgetSmIcon" />
            Display
        </button>
        </a>
        </li>
        <li className="widgetSmListItem">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBAyGmCfSr4dw020wYF7U5nYAybqWpbPPVXw&usqp=CAU"
          className="widgetSmImage"
        alt=""></img>
        <div className="widgetSmUser">
          <span className="widgetSumUsername">Anna keller</span>
          <span className="widgetSumUserTitle">Software Engineer</span>
        </div>
        <a href="/candidature">
        <button className="widgetSumButton" >
            <VisibilityIcon className="widgetSmIcon" />
            Display
        </button>
        </a>
        </li>
        <li className="widgetSmListItem">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBAyGmCfSr4dw020wYF7U5nYAybqWpbPPVXw&usqp=CAU"
          className="widgetSmImage"
        alt=""></img>
        <div className="widgetSmUser">
          <span className="widgetSumUsername">Anna keller</span>
          <span className="widgetSumUserTitle">Software Engineer</span>
        </div>
        <a href="/candidature">
        <button className="widgetSumButton" >
            <VisibilityIcon className="widgetSmIcon" />
            Display
        </button>
        </a>
        </li>
    </ul>
    </div>
  )
}
