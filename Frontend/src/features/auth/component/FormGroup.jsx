import React from 'react'
import '../style/login.scss'

const FormGroup = ({ label, placeholder}) => {
  return (
    <div className="form-group">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input type="text" id={label.toLowerCase()} placeholder={placeholder} required />
    </div>
  )
}

export default FormGroup
