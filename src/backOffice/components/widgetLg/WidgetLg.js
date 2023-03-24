import "./WidgetLg.css"
export default function WidgetLg() {

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle"> Dernières transactions</h3>
      <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Apprenant</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Prix</th>
            <th className="widgetLgTh"></th>
          </tr>
          <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRup_aChs8NkjJa73BCuHy7ggZdy9kbrdmyxQ&usqp=CAU" 
            alt="" className="widgetLgImg"></img>
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">2 Mars 2022</td>
          <td className="widgetLgAmount">100 TDD</td>
          </tr>
          <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRup_aChs8NkjJa73BCuHy7ggZdy9kbrdmyxQ&usqp=CAU" 
            alt=""
             className="widgetLgImg"></img>
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">2 Mars 2022</td>
          <td className="widgetLgAmount">100 TDD</td>
          </tr>
          <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRup_aChs8NkjJa73BCuHy7ggZdy9kbrdmyxQ&usqp=CAU" 
            alt="" className="widgetLgImg"></img>
            <span className="widgetLgName">Susan Carol</span>
          </td>
          <td className="widgetLgDate">2 Mars 2022</td>
          <td className="widgetLgAmount">100 TDD</td>
          </tr>
      </table>
    </div>
  )
}
