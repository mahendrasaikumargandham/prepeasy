import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserAuth } from '../authContext'
const SignUp = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {user,signUp} = UserAuth();
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      await signUp(email,password)
      navigate('/signin')
    } catch(error){
      console.log(error)
    }
  }
  return (
        <div>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' autoComplete='email'/>
            <input onChange={(e)=>setPassword(e.target.value)}  type='password' placeholder='Password' autoComplete='current-password'/>
            <button>Sign Up</button>
            <div>
              <p style={{margin:'5px 0px'}}><input type='checkbox'/>Remember Me</p>
              <p>Need Help?</p>
            </div>
            <p>Already have an Account?{"  "} <Link to='/signin'>Sign In</Link></p>
          </form>
        </div>
  )
}

export default SignUp
