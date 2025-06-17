import validator from "validator"
import bcrypt, { hash } from "bcrypt"
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModels.js"
import userModel from "../models/userModel.js"

//API to Add Doctor
const addDoctor = async (req, res) => {

    try {

        const { name, email, password, specialty, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
        // Checking for all data to add to doctor
        if (!name || !email || !password || !specialty || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message: "Missing Details"})
        }

        //Validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Please enter a valid email"})
        }

        //Validating strong password
        if (password.length < 8) {
            return res.json({success:false, message: "Please enter a stronger password"})
        }

        //Hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            specialty,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)

        await newDoctor.save()

        res.json({success:true, message:"Doctor Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API for Admin Login
const loginAdmin = async (req, res) => {
    try {
        
        const {email, password} = req.body 

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({success:true, token})
            


        } else {
            res.json({success:false, message:"Invalid Credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get list of all doctors for the admin panel
const allDoctors = async (req, res) => {
    try {
        
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})


    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get all the appoinment list
const appointmentsAdmin = async (req, res) => {

    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
        
        const {appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)


        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        // Opening up the doctors slot for other appointments
        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:'Appointment Cancelled'})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Api to get the dashboard data for admin panel
const adminDashboard = async (req,res) => {
    
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            lastestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})

        
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message})
        
    }
}

export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}