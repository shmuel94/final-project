import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Staff from './pages/Staff'
import Products from './pages/Products'
import Gallery from './pages/Gallery'
import Review from './pages/Review'
import UserMessages from './pages/UserMessages'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
require('typeface-vibur')

function App () {
  const [auth, setAuth] = useState(null)
  const AUTH_LOCAL_STORAGE = 'User_Info'

  useEffect(() => {
    let authStorage = JSON.parse(localStorage.getItem(AUTH_LOCAL_STORAGE))
    return authStorage ? setAuth(authStorage) : null
  }, [])

  return (
    <BrowserRouter>
      <div className='App'>
        <img
          id='logo'
          src='https://i.ibb.co/txxHvs7/d83a35fd-1000-466d-9ceb-dd287592c18e.jpg'
        />
        {!auth ? (
          <div className='navbar'>
            <Link to='/'>Home</Link> <Link to='/Staff'>Staff</Link>{' '}
            <Link to='/Products'>Products</Link>{' '}
            <Link to='/Gallery'>Gallery</Link>
          </div>
        ) : (
          <div className='navbar'>
            <Link to='/'>Home</Link> <Link to='/Staff'>Staff</Link>{' '}
            <Link to='/Products'>Products</Link>{' '}
            <Link to='/Gallery'>Gallery</Link> <Link to='/Review'>Review</Link>{' '}
            <Link to='/UserMessages'>Messages</Link>
          </div>
        )}
        {auth ? (
          <button
            className='btn'
            onClick={() => {
              setAuth(null)
              localStorage.setItem(AUTH_LOCAL_STORAGE, JSON.stringify(null))
            }}
          >
            log out
          </button>
        ) : (
          ''
        )}
        <div className='sign'>
          <span className='sign__word'>wondemagen barbershop</span>
        </div>
        <Switch>
          <Route exact path='/Staff' render={() => <Staff />} />
          <Route exact path='/Products' render={() => <Products />} />
          <Route
            exact
            path='/Gallery'
            render={() => <Gallery auth={auth} setAuth={setAuth} />}
          />
          <Route
            exact
            path='/Review'
            render={() => <Review auth={auth} setAuth={setAuth} />}
          />
          <Route
            exact
            path='/UserMessages'
            render={() => <UserMessages auth={auth} setAuth={setAuth} />}
          />
        </Switch>
        <Route
          exact
          path='/'
          render={() => (
            <Home
              auth={auth}
              setAuth={setAuth}
              AUTH_LOCAL_STORAGE={AUTH_LOCAL_STORAGE}
            />
          )}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
