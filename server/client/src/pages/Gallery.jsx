import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export default function Gallery () {
  const [gallery, setGallery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/gallery')
      .then(response => {
        console.log(response)
        setGallery(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  const data = gallery
    ? gallery.map((gallery, i) => {
        return (
          <div key={i}>
            <img id='galleryImg' src={gallery.img} />
          </div>
        )
      })
    : ''

  return (
    <div>
      <h4>Gallery</h4>
      {isLoading ? (
        <div className='lds-circle'>
          <div>
            <img src='https://i.ibb.co/txxHvs7/d83a35fd-1000-466d-9ceb-dd287592c18e.jpg' />{' '}
          </div>
        </div>
      ) : (
        ''
      )}
      <div id='galleryFrame'>{data}</div>
    </div>
  )
}
