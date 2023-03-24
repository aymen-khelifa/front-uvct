import React from 'react'
import "./Nofification.css"
export const ShowErrMsg = (msg) => {
    return <div className="errMsg">{msg}</div>
}

export const ShowSuccessMsg = (msg) => {
    return <div className="successMsg">{msg}</div>
}