import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Staff = () => {
  const [staffInfo, setStaffInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/staff')
      .then(response => {
        setIsLoading(false)
        console.log(response)
        setStaffInfo(response.data)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  const element = Array.isArray(staffInfo)
    ? staffInfo.map((info, i) => {
        return (
          <div className='staffName' key={i}>
            <h4>{info.name}</h4>
            <img src={info.img} />
            <br />
            <div className='barberInfo'>
              <a href={info.facebook} target='_blank'>
                <img src='https://img.icons8.com/color/48/000000/facebook.png' />
              </a>
              <a href={info.instagram} target='_blank'>
                <img src='https://img.icons8.com/color/48/000000/instagram-new--v2.png' />
              </a>
            </div>
          </div>
        )
      })
    : []

  return (
    <>
      <h4>Staff</h4>
      {isLoading ? (
        <div className='lds-circle'>
          <div>
            <img src='https://i.ibb.co/txxHvs7/d83a35fd-1000-466d-9ceb-dd287592c18e.jpg' />{' '}
          </div>
        </div>
      ) : (
        ''
      )}
      <>{element}</>
      <div className='avielInfo'>
        <h3>
          {' '}
          Here you can hear some of the mixes and sets by DJ Aviel Wondemagen{' '}
        </h3>
        <a href='https://soundcloud.com/djwondemagen' target='_blank'>
          <img src='https://img.icons8.com/color/48/000000/soundcloud.png' />
        </a>
        <a
          href='https://www.youtube.com/channel/UC3joA3VXl0hZ0D7BOdZPQ8Q'
          target='_blank'
        >
          <img src='https://img.icons8.com/color/48/000000/youtube-play.png' />
        </a>
      </div>
    </>
  )
}
export default Staff
