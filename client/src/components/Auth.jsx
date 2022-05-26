import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { checkUserExists, getUser, login, register } from '../services/apiService'
import style from './style.module.css'
import { onLogInRequest } from '../redux/actions/UserAuthAction'
import { useNavigate } from 'react-router-dom'
import { IoReturnUpBackSharp } from 'react-icons/io5'

export const Auth = () => {
  const dispatch = useDispatch()
  let Navigate = useNavigate();
  const [go, setGo] = useState({
    initial: true,
    login: false,
    register: false,
  })

  const [data, setData] = useState({
    name: '',
    email: '',
    confPass: '',
    password: ''
  })

  const [error, setError] = useState({
    name: false,
    email: false,
    confPass: false,
    password: false

  })

  const [valid, setValid] = useState({
    name: false,
    email: false,
    confPass: false,
    password: false
  })

  // ----regex to check email validation ----- 
  // eslint-disable-next-line
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
  let mailRef = useRef()

  return (
    <>
      <div 
        className={style.back_to_home}
        onClick={()=>Navigate('/')}
      >
          <IoReturnUpBackSharp size={30}/>
      </div>
      <div className={style.auth_box}>
        <h5 className="text-center mb-4">
          {(go.initial) && 'Please Enter Your Email'}
          {go.login && 'Welcome Again'}
          {go.register && 'Happy To See You'}
        </h5>


        <div className="form">
          {
            go.register && <div className={style.inputWrapper}>
              <input
                className={`${style.inputBox} ${data.name.length > 0 ? style.active : ''} ${valid.name ? style.valid : ''}`}
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value })
                  if (data.name.length > 0 && data.name.length <= 3) {
                    // if length less then 6 chars :  error will be true and validation will be false
                    setError({ ...error, name: true })
                    setValid({ ...valid, name: false })
                  }
                  else {
                    setError({ ...error, name: true })
                    setValid({ ...valid, name: false })
                  }
                }}
              />
              <label htmlFor='password' className={style.inputLable}>Full name</label>
              {
                error.password && <p className={`${style.errMsg} ${error.password ? style.hasErr : ''}`}>Name must have atleast 3 characters</p>
              }
            </div>
          }
          <div className={style.inputWrapper}>
            <input
              className={`${style.inputBox} ${data.email.length > 0 ? style.active : ''} ${valid.email ? style.valid : ''}`}
              type="email"
              id="email"
              ref={mailRef}
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value })
              }}
            />
            <label htmlFor='email' className={style.inputLable}>Email Address</label>
            {
              error.email && <p className={`${style.errMsg} ${error.email ? style.hasErr : ''}`}>Email must be Valid</p>
            }
          </div>

          {/* it will ask for password if or not if email matches */}
          {
            (go.login || go.register) && <div className={style.inputWrapper}>
              <input
                className={`${style.inputBox} ${data.password.length > 0 ? style.active : ''} ${valid.password ? style.valid : ''}`}
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value })
                  if (data.password.length > 0 && (data.password.length >= 6 && data.password.length <= 20)) {
                    // if length less then 6 chars :  error will be true and validation will be false
                    setError({ ...error, password: false })
                    setValid({ ...valid, password: true })
                  }
                  else {
                    setError({ ...error, password: true })
                    setValid({ ...valid, password: false })
                  }
                }}
              />
              <label htmlFor='password' className={style.inputLable}>Password</label>
              {
                error.password && <p className={`${style.errMsg} ${error.password ? style.hasErr : ''}`}>Password must be in between 6 to 20 characters</p>
              }
            </div>

          }
          {
            (go.register) && <div className={style.inputWrapper}>
              <input
                className={`${style.inputBox} ${data.confPass.length > 0 ? style.active : ''} ${valid.confPass ? style.valid : ''}`}
                type="password"
                id="confPass"
                value={data.confPass}
                onChange={(e) => {
                  setData({ ...data, confPass: e.target.value })
                  if (data.confPass !== data.password.slice(0,data.password.length-1)) {
                    // if length less then 6 chars :  error will be true and validation will be false
                    setError({ ...error, confPass: true })
                    setValid({ ...valid, confPass: false })
                  }
                  else {
                    setError({ ...error, confPass: false })
                    setValid({ ...valid, confPass: true })
                  }
                }}
              />
              <label htmlFor='confPass' className={style.inputLable}>Confirm password</label>
              {
                error.confPass && <p className={`${style.errMsg} ${error.confPass ? style.hasErr : ''}`}>Both Password doesn't match</p>
              }
            </div>

          }


          {/* --------- initial process button -------- */}

          {/* this is the initial button that will on click verifies the email */}
          {
            (go.initial) && <div className={style.inputWrapper}>
              <button className="btn btn-warning" onClick={() => {
                if (!data.email.match(regEmail)) {
                  setError({ ...error, email: true })
                  setValid({ ...valid, email: false })
                  mailRef.current.focus()
                  // console.log('Invalid Email');
                } else {
                  checkUserExists(data).then(response => {
                    if (response?.status === 200) {
                      setGo({ ...go, login: true, initial: false })
                    } else {
                      setGo({ ...go, register: true, initial: false })
                    }
                  })
                }

              }}>
                Proceed
              </button>
            </div>
          }



          {/* --------- login button -------- */}

          {/* login button only show when email matches from database */}
          {
            (go.login) && <div className={style.inputWrapper}>
              <button className="btn btn-warning" onClick={() => {
                login(data).then(response => {
                  // localStorage.setItem(response.data.token)
                  try {
                    if (response?.status === 202) {
                      const auth_token = response.data.auth_token // pull out auth token from response data
                      // console.log(response.data);
                      getUser(auth_token).then(res => { 
                        // console.log(res);
                        localStorage.setItem("auth-token", auth_token)
                        dispatch(onLogInRequest(res.data))
                        Navigate('/')
                      })
                    } else {
                      console.log(response);
                    }
                  } catch (error) {
                    console.log(error);
                  }

                })

              }}>
                Login
              </button>
            </div>
          }


          {/* --------- register button -------- */}
          {
            (go.register) && <div className={style.inputWrapper}>
              <button className="btn btn-warning" onClick={()=>{
                  register(data).then(res => {
                    console.log(res)
                    setGo({ ...go, register: false, login: true })
                  }).catch(err => console.log(err,'there is an error in calling api'))
              }}>
                Register
              </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}
