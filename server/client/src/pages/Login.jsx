import { useState } from 'react'
import axios from 'axios'
import API_KEY from '../api_key/Api_Key'
import { Redirect } from 'react-router-dom'

export default function LogIn ({ auth, setAuth, AUTH_LOCAL_STORAGE }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [disabale, setDisable] = useState(false)
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
  const isValid = () => {
    return email.length && password.length
  }
  const LogInVerification = () => {
    axios
      .post(URL, {
        email,
        password
      })
      .then(res => {
        console.log(res)
        setAuth(res.data)
        localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(res))
        setError(false)
      })
      .catch(err => {
        console.log(err.res, setError(true))
      })
  }

  if (auth) {
    return <Redirect to='/' />
  }

  return (
    <div className='regLog'>
      <h3>Log In</h3>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (isValid()) {
            LogInVerification()
          }
        }}
      >
        <input
          onChange={e => {
            setEmail(e.target.value)
            setDisable(() => isValid())
          }}
          type='email'
          placeholder='enter email'
        />
        <br />
        <input
          onChange={e => {
            setPassword(e.target.value)
            setDisable(() => isValid())
          }}
          type='password'
          placeholder='enter password'
        />
        <br />
        {error ? (
          <h4 style={{ color: 'rgb(255, 255, 255, 0.4)' }}>
            incorrect Password/Email
          </h4>
        ) : (
          ''
        )}
        <input
          className='btn'
          disabled={!disabale}
          type='submit'
          value={'sign in'}
        />
      </form>
    </div>
  )
}
