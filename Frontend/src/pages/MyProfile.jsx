import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {

    try{
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}})

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else{
        toast.error(data.message)
      }


    }catch(error){
      console.log(error)
      toast.error(error.message)

    }
``
  }

  return userData && (
      <div className='w-full bg-white shadow-lg rounded-xl p-6 flex flex-col gap-4 text-sm'>

        {
          isEdit
          ? <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 h-36 object-cover rounded-full border border-gray-300 opacity-75 hover:opacity-90 transition' src={image ? URL.createObjectURL(image): userData.image} alt="" />
              <img className='w-8 absolute bottom-2 right-2' src={image ? '': assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          : <img className='w-36 h-36 object-cover rounded-full border border-gray-300' src={userData.image} alt="" />

        }

        {
          isEdit 
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev, name: e.target.value}))}/>
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
        }

        <hr className='bg-zinc-400 h-[1px] border-none' />
        <div>
          <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Email:</p>
            <p className='text-blue-500'>{userData.email}</p>
            <p className='font-medium'>Phone:</p>
            {
              isEdit 
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev, phone: e.target.value}))}/>
              : <p className='text-blue-400'>{userData.phone}</p>
            }
            <p className='font-medium'>Address:</p>
            {
              isEdit 
              ? 
              <p>
                <input className='bg-gray-50 min-w-52' onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text" />
                <br />
                <input className='bg-gray-50 min-w-52' onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={userData.address.line2} type="text" />
              </p>
              : 
              <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            }
          </div>
        </div>

        <div>
          <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Gender:</p>
            {
              isEdit 
              ? <select className='min-w-52 bg-gray-100' onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400'>{userData.gender}</p>
            }
            <p className='font-medium'>Birthday:</p>
            {
              isEdit 
              ? <input className='min-w-52 bg-gray-100' onChange={(e) => setUserData(prev => ({...prev, dob: e.target.value}))} value={userData.dob} type="date" />
              : <p className='text-gray-400'>{userData.dob}</p>
            }
          </div>
        </div>

        <div className='mt-10'>
          {
            isEdit
            ? <button className='border border-primary px-16 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}>Save Information</button>
            : <button className='border border-primary px-32 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
          }
        </div>
      </div>
  )
}

export default MyProfile
