import React from 'react'
import { Result, Button } from 'antd';

function NotFound() {
    return (
        <Result style={{width:'80%',position:'absolute',marginLeft:'15%',marginTop:'-15px'}}
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" href='/'>Back Home</Button>}
  />
    )
}

export default NotFound