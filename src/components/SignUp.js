import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserAuth } from '../authContext'
import './CSS/SignUp.css'
const SignUp = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {user,signUp} = UserAuth();
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      await signUp(email,password)
      navigate('/')
    } catch(error){
      console.log(error)
    }
  }
  return (
        <div className='signup-container'>
          <h1>Sign Up</h1>
          <form className='signup-form' onSubmit={handleSubmit}>
            <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' autoComplete='email'/>
            <input onChange={(e)=>setPassword(e.target.value)}  type='password' placeholder='Password' autoComplete='current-password'/>
            <button>Sign Up</button>
            <p>Already have an Account?{"  "} <Link to='/signin'>Sign In</Link></p>
          </form>
        </div>
  )
}

export default SignUp
