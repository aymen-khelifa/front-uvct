import React from 'react'
import { Input} from 'antd';

const { Search } = Input;
const onSearch = value => console.log(value);
function Etudiants() {
  return (
    <div className="coupon">
    <div className="search">
      <Search placeholder="Rechercher des étudiants" allowClear onSearch={onSearch}  />
      </div>
    </div>
  )
}

export default Etudiants