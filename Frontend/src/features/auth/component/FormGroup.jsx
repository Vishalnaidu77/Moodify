import React from 'react'
import '../style/login.scss'

const FormGroup = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input 
        type="text" 
        id={label.toLowerCase()} 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
        required 
      />
    </div>
  )
}

export default FormGroup
