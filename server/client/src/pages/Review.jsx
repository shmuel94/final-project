import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Review ({ auth }) {
  const [fullName, setFullName] = useState('')
  const [barberName, setBarberName] = useState('')
  const [review, setReview] = useState('')
  const [userReview, setUserReview] = useState('')
  const [disabale, setDisable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isValid = () => {
    return fullName.length && barberName === "aviel"  && review.length || fullName.length && barberName === "osher"  && review.length
  }

  const formVerification = () => {
    axios
      .post('/user_rating', {
        fullName,
        barberName,
        review
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const reloadForm = () => {
    axios
      .get('/user_rating')
      .then(response => {
        console.log(response)
        setUserReview(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/user_rating')
      .then(response => {
        console.log(response)
        setUserReview(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  if (!auth) {
    return <Redirect to='/' />
  }
  const data = Array.isArray(userReview)
    ? userReview.map((review, i) => {
        return (
          <div key={i}>
            <tr>
              <td>{review.fullName}</td>
              <td>{review.barberName}</td>
              <td>{review.message}</td>
            </tr>
          </div>
        )
      })
    : []
  return (
    <div>
      <h4 className='logOrReg'>User Reviews</h4>
      {auth.email === 'shmuelmoche@gmail.com' ? (
        ''
      ) : (
        <form
          className='newReview'
          onSubmit={e => {
            e.preventDefault()
            alert('the review was sent successfully')
            if (isValid()) {
              formVerification()
            }
          }}
        >
          <input
            onChange={e => {
              setBarberName(e.target.value)
              setDisable(() => isValid())
            }}
            type='text'
            placeholder='enter barber name'
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
              setReview(e.target.value)
              setDisable(() => isValid())
            }}
            type='text'
            placeholder='enter review'
          />
          <br />
          <input
            onClick={() => {
              reloadForm()
            }}
            className='btn'
            disabled={!disabale}
            type='submit'
            value={'send review'}
          />
        </form>
      )}
      {isLoading ? (
        <div className='lds-circle'>
          <div>
            <img src='https://i.ibb.co/txxHvs7/d83a35fd-1000-466d-9ceb-dd287592c18e.jpg' />{' '}
          </div>
        </div>
      ) : (
        ''
      )}
      <table className='table'>
        <tr>
          <th>full name</th>
          <th>barber name</th>
          <th>review</th>
        </tr>
        {Array.isArray(userReview)
          ? userReview.map((review, i) => {
              return (
                <tr key={i}>
                  <td>{review.fullName}</td>
                  <td>{review.barberName}</td>
                  <td>{review.review}</td>
                </tr>
              )
            })
          : []}
      </table>
    </div>
  )
}
