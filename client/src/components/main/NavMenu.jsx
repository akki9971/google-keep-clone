import React from 'react'
import {
  Link, useMatch,
  useResolvedPath,
} from 'react-router-dom'
import { AiOutlineBulb, AiOutlineBell, AiOutlineEdit } from 'react-icons/ai'
import { FaRegTrashAlt } from 'react-icons/fa'
import { RiInboxArchiveLine } from 'react-icons/ri'
import { nav_menu, menu_item, menu_item_icon, menu_item_text, active } from './home.module.css'


// this is custom hook for displaying active menu item
function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      className={match ? active : ''}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

export const NavMenu = () => {

  
  return (
    <>
      <div className={nav_menu}>
        <div className={menu_item}>
          <CustomLink to='/'  >
            <p className={menu_item_text}>
              <i className={menu_item_icon}><AiOutlineBulb /> </i>
              Notes
            </p>
          </CustomLink>
        </div>
        <div className={menu_item}>
          <CustomLink to='/reminder' >
            <p className={menu_item_text}>
              <i className={menu_item_icon}><AiOutlineBell /> </i>
              Reminder
            </p>
          </CustomLink>
        </div>
        {/* <div className={menu_item}>
          <CustomLink to='/ss'  >
            <p className={menu_item_text}>
              <i className={menu_item_icon}>A </i>
              SS
            </p>
          </CustomLink>
        </div> */}
        <div className={menu_item}>
          <CustomLink to='/editlabel'  >
            <p className={menu_item_text}>
              <i className={menu_item_icon}><AiOutlineEdit /> </i>
              Edit Labels
            </p>
          </CustomLink>
        </div>
        <div className={menu_item}>
          <CustomLink to='/archieve'  >
            <p className={menu_item_text}>
              <i className={menu_item_icon}><RiInboxArchiveLine /> </i>
              Archieve
            </p>
          </CustomLink>
        </div>
        <div className={menu_item}>
          <CustomLink to='/bin'  >
            <p className={menu_item_text}>
              <i className={menu_item_icon}><FaRegTrashAlt /> </i>
              Trash Bin
            </p>
          </CustomLink>
        </div>
      </div>
    </>
  )
}
