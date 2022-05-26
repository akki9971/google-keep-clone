import React, {useState, useEffect } from 'react'
import { onHideMenu, onMenuToggle } from '../redux/actions/MenuAction'
import {
  Link,
  // useNavigate
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { Container, Button, Row, Col, Alert } from 'react-bootstrap'
import { 
  navigation_bar,
  navigation_bar_2,
  toggle_btn,
  navbar_title,
  navbar_link,
  navbar_link_logout,
  greeting,
  userInMobile,
  userOptionsInMobile } from './navbar.module.css'
import { onLogInRequest, onLogOutRequest } from '../redux/actions/UserAuthAction'
import { getUser } from '../services/apiService'
import { onRemoveAllNotes } from '../redux/actions/NotesAction'
import { useWidthHook } from './customHooks'
import { FaUserTie, FaSignInAlt } from 'react-icons/fa'


export const Navbar = () => {
  const width = useWidthHook()
  const [userOptionOpen , setUserOptionOpen] = useState(false)
  // const navigate = useNavigate() 
  const dispatch = useDispatch()
  const User = useSelector(state => state?.UserReducer?.state) // it wil give user from redux store
  // console.log(userOptionOpen);


  useEffect(() => {

    const auth_token = localStorage.getItem('auth-token')
    // if token exists in localStorage then it will get user details from apiService
    if (auth_token) {
      getUser(auth_token).then(res => {
        // console.log(res);
        dispatch(onLogInRequest(res.data))
      })
    }

    return () => {
      // and we ensure to remove the auth token and loggedIn User from our application on refresh or closing of application
      // localStorage.removeItem('auth-token')
      // dispatch(onLogOutRequest(null))
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <div className={`navbar ${navigation_bar}`}>
        <div className={navigation_bar_2}
          onClick={() => dispatch(onMenuToggle())}  // dispatch an action to toggle side menu
        >
          <button className={toggle_btn} >
            |||
          </button>
          <h5 className={navbar_title}>
            Google Keep With React
          </h5>
        </div>
        <div>
          {
            width < 550 ? ( // this is for responsive media
              User ? <>
                {/*  if there is mobile screen
                   user icon will be shown if user logged in  */}
                <span className={`border border-dark p-2 rounded-circle ${userInMobile}`} onClick={()=>{
                  setUserOptionOpen(!userOptionOpen)
                  dispatch(onHideMenu())
                  }}><FaUserTie size={25} /></span>
                <div className={`${userOptionsInMobile} ${userOptionOpen ? "show":"hide"}`}>
                     <UserNameWithLogoutButton user={User.name} display="d-block" />
                   </div>
              </> :
                // signin icon will be shown if user not logged in
                <Link to="/auth" className={navbar_link}>< FaSignInAlt size={25} /></Link>) : <div className={''}>

              { // this is for large screens
                !User
                  ? <Link to="/auth" className={navbar_link}>Login</Link> // is user not logged in
                  : <>
                    {/* // if user logged in */}
                    <UserNameWithLogoutButton user={User.name} />
                  </>
              }
            </div>
          }
        </div>
      </div>
    </>
  )
}

export const UserNameWithLogoutButton = ({ user, display ="d-inline-block" }) => {
  const dispatch = useDispatch()
  console.log(user)
  return (
    <>
      {/* it will welcome username */}
      <h6 className={`me-0 me-sm-4 ${display}`}>hello <span className={`${greeting} ${display}`}>{user}</span> </h6>
      <button // and logout option
        onClick={() => {
          dispatch(onRemoveAllNotes()) // remove all notes from notes store
          localStorage.removeItem('auth-token') // remove token from localStorage
          dispatch(onLogOutRequest(null)) // dispatch an action of logout
          // navigate('/') // navigate to login page
        }}
        className={navbar_link_logout}
      >
        Logout
      </button>
    </>
  )
}