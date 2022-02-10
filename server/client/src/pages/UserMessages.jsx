import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useState } from 'react'

export default function UserMessages ({ auth }) {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [disabale, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (!auth) {
    return <Redirect to='/' />
  }

  const isValid = () => {
    return fullName.length && phoneNumber.length && message.length
  }

  const formVerification = () => {
    axios
      .post('/user_messages', {
        fullName,
        phoneNumber,
        message
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  function getAllMessages () {
    setIsLoading(true)
    axios
      .get('/user_messages')
      .then(response => {
        console.log(response)
        setUserMessage(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const data = userMessage
    ? userMessage.map((message, i) => {
        return (
          <div key={i}>
            <tr>
              <td>{message.fullName}</td>
              <td>{message.phoneNumber}</td>
              <td>{message.message}</td>
            </tr>
          </div>
        )
      })
    : ''
  return (
    <div>
      <h4>User Messages</h4>
      {auth.email === 'shmuelmoche@gmail.com' ? (
        <>
          <button className='btn' onClick={() => getAllMessages()}>
            {' '}
            see all messages
          </button>
          <table className='table'>
            {isLoading ? (
              <div className='lds-circle'>
                <div>
                  <img src='https://i.ibb.co/txxHvs7/d83a35fd-1000-466d-9ceb-dd287592c18e.jpg' />{' '}
                </div>
              </div>
            ) : (
              ''
            )}
            <tr>
              <th>full name</th>
              <th>phone number</th>
              <th>message</th>
            </tr>
            {userMessage
              ? userMessage.map((message, i) => {
                  return (
                    <tr key={i}>
                      <td>{message.fullName}</td>
                      <td>{message.phoneNumber}</td>
                      <td>{message.message}</td>
                    </tr>
                  )
                })
              : ''}
          </table>
        </>
      ) : (
        <form
          className='newMessage'
          onSubmit={e => {
            e.preventDefault()
            alert('the message was sent successfully')
            if (isValid()) {
              formVerification()
            }
          }}
        >
          <input
            onChange={e => {
              setPhoneNumber(e.target.value)
              setDisable(() => isValid())
            }}
            type='number'
            placeholder='enter phone number'
          />
          <br />
          <input
            onChange={e => {
              setFullName(e.target.value)
              setDisable(() => isValid())
            }}
            type='text'
            placeholder='enter full name'
          />
          <br />
          <textarea
            onChange={e => {
              setMessage(e.target.value)
              setDisable(() => isValid())
            }}
            type='text'
            placeholder='enter message'
          />
          <br />
          <input
            className='btn'
            disabled={!disabale}
            type='submit'
            value={'send message'}
          />
        </form>
      )}
    </div>
  )
}
