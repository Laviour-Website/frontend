import React from 'react'

export default function ColorComponent({onChange,color,value, label}) {
  return (
    <div className="flex items-center">
    <input
      className="h-4 w-4 ml-2 mr-1"
      type="checkbox"
      value={value}
      id={value}
      onChange={onChange}
    ></input>
    <div className={`w-8 h-4 mx-1 bg-[${color}]`}></div>
    <label className="mx-1" for={value}>
      {label}
    </label>
  </div>
  )
}
