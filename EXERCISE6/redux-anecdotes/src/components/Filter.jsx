import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

function Filter() {
    const dispatch = useDispatch()

    const handleChange = (event)=>{
        dispatch(setFilter(event.target.value))
    }



  return (
    <div style={{marginBottom:"40px"}}>
      
      filter <input onChange = {handleChange}/>

    </div>
  )
}

export default Filter
