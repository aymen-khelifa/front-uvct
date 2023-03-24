import './Chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Chart({title,data,dataKey, grid}) {
    
  return (
    <div className='chart'>
      <h3 className='chartTitle'>
       {title}
      </h3>
      <ResponsiveContainer width="80%" aspect={3/1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke='#5550bd'/>
          <Line  type="monotone" dataKey={dataKey} stroke='#5550bd'/>
          <YAxis />
          <Tooltip />
          <Legend />
          {grid && <CartesianGrid strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
