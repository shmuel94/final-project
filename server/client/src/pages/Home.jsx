import Register from './Register'
import Login from './Login'
import { Redirect } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Home = ({ auth, setAuth, AUTH_LOCAL_STORAGE }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [sliderImages, setSliderImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/slider_images')
      .then(response => {
        setIsLoading(false)
        console.log(response.data)
        setSliderImages(response.data)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  const element = Array.isArray(sliderImages)
    ? sliderImages.map((sliderImage, i) => {
        return (
          <div key={i} id='frame'>
            <img src={sliderImage.img} />
          </div>
        )
      })
    : []

  return (
    <div>
      <h4>Home</h4>
      <div>
        <div>
          {auth ? (
            ''
          ) : (
            <button
              className='btn'
              onClick={() => {
                setIsLogin(true)
                setIsRegister(false)
                if (isLogin) {
                  return <Redirect to='/Login' />
                }
              }}
            >
              Login
            </button>
          )}
          {auth ? (
            ''
          ) : (
            <button
              className='btn'
              onClick={() => {
                setIsRegister(true)
                setIsLogin(false)
                if (isRegister) {
                  return <Redirect to='/Register' />
                }
              }}
            >
              Register
            </button>
          )}
          {auth ? (
            ''
          ) : (
            <h5 className='logOrReg'>
              {' '}
              Login / Register to leave a review or message{' '}
            </h5>
          )}
          {isRegister ? (
            <Register
              auth={auth}
              setAuth={setAuth}
              AUTH_LOCAL_STORAGE={AUTH_LOCAL_STORAGE}
              isRegister={isRegister}
              setIsRegister={setIsRegister}
            />
          ) : (
            ''
          )}{' '}
          <br />
          {isLogin ? (
            <Login
              auth={auth}
              setAuth={setAuth}
              AUTH_LOCAL_STORAGE={AUTH_LOCAL_STORAGE}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          ) : (
            ''
          )}
        </div>
        {isLoading ? (
          <div className='lds-circle'>
            <div>
              <img src='https://i.ibb.co/txxHvs7/d83a35fd-1000-466d-9ceb-dd287592c18e.jpg' />{' '}
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='slider'>{element}</div>
        <div id='info'>
          <p>
            phone number : <br />{' '}
            <a href='tel:+972536240281'>+972 53-624-0281</a> (aviel), <br />{' '}
            <a href='tel:+972532210440'>+972 53-221-0440</a> (osher) <br />
            adress : Pinsker 22, Netanya
          </p>
        </div>
        <div id='about'>
          <p>
            About the barbershop.. <br /> We invite you to be impressed by a
            young and colorful men's barbershop,
            <br /> innovative and full of style.
            <br /> waiting for you..
          </p>
        </div>
      </div>
      <h5>Follow us</h5>
      <footer className='footer'>
        <section className='links'>
          <a
            href='https://www.facebook.com/wondemagen_barbershop-104407571144356/'
            target='_blank'
          >
            <img src='https://img.icons8.com/color/48/000000/facebook.png' />
          </a>
          <a
            href='https://instagram.com/wondemagen_barbershop?utm_medium=copy_link'
            target='_blank'
          >
            <img src='https://img.icons8.com/color/48/000000/instagram-new--v2.png' />
          </a>
          <a href='https://vm.tiktok.com/ZSe4QdMkw/' target='_blank'>
            <img src='https://img.icons8.com/color/48/000000/tiktok--v2.png' />
          </a>
        </section>
      </footer>
    </div>
  )
}
export default Home
