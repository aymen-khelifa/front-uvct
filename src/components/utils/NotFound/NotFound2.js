import React from 'react'
import { Result, Button } from 'antd';

function NotFound() {
    return (
        <Result style={{width:'80%',marginLeft:'8%',}}
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary" href='/'>Back Home</Button>}
  />
    )
}

export default NotFound