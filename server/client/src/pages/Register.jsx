import { useState } from 'react'
import axios from 'axios'
import API_KEY from "../api_key/Api_Key"
import { Redirect } from "react-router-dom";

export default function Register ({auth , setAuth, AUTH_LOCAL_STORAGE }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const [disable, setDisable] = useState(false)
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
  const isValid = () => {
    return (email.length && password.length && confirmPassword.length && password === confirmPassword)
  }

  console.log(disable);
  const RegisterUser = () => {
    console.log({email, password, confirmPassword});
    axios
      .post(URL, {
        email,
        password,
        confirmPassword
      })
      .then(res => {
        console.log(res);
          localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(res))
        setAuth(res); setError(false)
      })
      .catch(err => {
        console.log(err); setError(true)
      })
  }

  if(auth){
    return <Redirect to="/"/>
  }

  return (
    <div className="regLog">
      <h3>Register</h3>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (isValid) {
            RegisterUser()
          }
        }}
      >
        <input
          onChange={e => {
            setPassword(e.target.value); setDisable(isValid())
          }}
          type='password'
          placeholder='enter password'
        />
        <br />
        <input
          onChange={e => {
            setConfirmPassword(e.target.value); setDisable(isValid())
          }}
          type='password'
          placeholder='confirm password'
        />
        <br />
            <input
              onChange={e => {
                setEmail(e.target.value); setDisable(isValid())
              }}
              type='email'
              placeholder='enter email'
            />
            <br />
        {error?<h4 style={{color:"rgb(255, 255, 255, 0.4)"}}>The passwords do not match</h4>:""}
        <input className="btn" disabled={!disable} type='submit' value='sign up' />
      </form>
    </div>
  )
}