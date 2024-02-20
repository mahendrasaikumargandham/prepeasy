import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserAuth } from '../authContext'
const SignIn = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const {user,logIn} = UserAuth()
  const navigate = useNavigate()
  const [error,setError] = useState('')
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setError('')
    try{
      await logIn(email,password)
      
      navigate('/')
    } catch(error){
      console.log(error)
      setError(error.message)
    }
  }
  return (
        <div>
          <h1 style={{fontSize:'1.25rem',lineHeight:'1.75rem'}}>Sign In</h1>
          {error?<p style={{backgroundColor:"#E84B4F",padding:"7px"}}>{error}</p>:null}
          <form onSubmit={handleSubmit}>
            <input onChange={(e)=>setEmail
            (e.target.value)} type='email' placeholder='Email' autoComplete='email'/>
            <input onChange={(e)=> setPassword
            (e.target.value)} type='password' placeholder='Password' autoComplete='current-password'/>
            <button>Sign In</button>
            <div>
              <p style={{margin:'5px 0px'}}><input type='checkbox'/>Remember Me</p>
              <p>Need Help?</p>
            </div>
            <p style={{padding:"12px 0px" }}><span style={{color:'#525252'}}>New to Netflix?</span>{"  "} <Link to='/signup'>Sign Up</Link></p>
          </form>
        </div>
  )
}

export default SignIn
