import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { NavMenu } from './NavMenu'
import { home_layout, sideMenu } from './home.module.css'
// import { MainContent } from './MainContent'
// import { TrashBin } from './subComps'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onHideMenu } from '../../redux/actions/MenuAction'
import { useWidthHook } from '../customHooks'

export const Home = () => {
  const { ToggleMenu } = useSelector(state => state.MenuToggleReducer) // it will give the current state of menuToggleReducer [true or false]
  const dispatch = useDispatch()
  const width = useWidthHook()
  // console.log(ToggleMenu)
  useEffect(() =>{
    if (width < 768) {
      dispatch(onHideMenu())
    }
  },[])

  return (
    <>
      <div className={home_layout}>
        <Container fluid>
          <Row>
            {/* // based on toggleMenuState, side menu will be hide or unhide */}
            <Col md={ToggleMenu ? 2 : 0} className={`p-0 ${ToggleMenu ? 'show' : 'hide'} ${sideMenu}`} >
              <NavMenu />
            </Col>
            <Col md={ToggleMenu ? 10 : 12}>
              {/* // this outlet is for navigation b/w trash bin and other menus */}
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
