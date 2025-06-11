import React from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useContext } from 'react'
import { useEffect } from 'react'

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors} = useContext(AdminContext)

  useEffect(()=> {
    if(aToken){
      getAllDoctors()
    }

  },[aToken])

  return (
    <div>

    </div>
  )
}

export default DoctorsList