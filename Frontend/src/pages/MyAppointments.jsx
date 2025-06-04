import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => { 

  const { doctors } = useContext(AppContext)

  return (
    <div>
        <p>My appointments</p>
        {/* We will display the appointments here */}
        <div>
          {doctors.slice(0,2).map((item,index)=> (
            <div key={index}>
              <div>
                <img src={item.image} alt="" />
              </div>
              <div>
                <p>{item.name}</p>
                <p>{item.specialty}</p>
                <p>Address</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
                <p><span>Date & Time:</span> 25, July, 2025 | 8:30PM</p>
              </div>
              <div></div>
              <div>
                <button>Pay Online</button>
                <button>Cancel appointment</button>
              </div>

            </div>
          ))}
        </div>
    </div>
  )
}

export default MyAppointments