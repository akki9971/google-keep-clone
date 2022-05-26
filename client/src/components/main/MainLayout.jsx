import React, { useState } from 'react'
import { Card, FloatingLabel, Form, Button } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
// import { onAddNote } from '../../redux/actions/NotesAction'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { postNote } from '../../services/apiService'
import style from './home.module.css'

export const MainLayout = () => {
    const Navigate = useNavigate()
    // const dispatch = useDispatch()
    const token = localStorage.getItem('auth-token')
    const title = useForm('')       // this is the use of customHook
    const desc = useForm('')        // this is the use of customHook
    const category = useForm('General')    // this is the use of customHook    
    const [isOpen, setIsOpen ] = useState(false)
    return (
        <>
            <div className="">
                <div className={style.myContainer}>
                    <div className="border-2 p-3 ">
                        <Card className="p-2" style={{position: "relative"}}>
                            {!isOpen && <h6 className="px-3 py-2 m-0" onClick={()=>setIsOpen(true)}>Create a Note</h6>}
                            {isOpen && <>
                                <span 
                                    className="" 
                                    style={{ position: "absolute", top: 1, right: 5, zIndex: 5 }}
                                    onClick={()=>setIsOpen(false)}
                                >
                                    <AiOutlineCloseCircle size={20} color="red" />
                                </span>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Title"
                                >
                                    <Form.Control
                                        type="text"
                                        className="mb-3 border-0 border-bottom"
                                        value={title.value}
                                        onChange={title.onChange}
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingTextarea2"
                                    label="Description ..."
                                >
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        className="mb-3 border-0 border-bottom"
                                        value={desc.value}
                                        onChange={desc.onChange}
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="category"
                                >
                                    <Form.Control
                                        type="text"
                                        className="mb-3 border-0 border-bottom"
                                        value={category.value}
                                        onChange={category.onChange}
                                    />
                                </FloatingLabel>
                                <Button
                                    className="ms-auto me-0"
                                    onClick={() => {
                                        if (token) {
                                            postNote({ token, title, desc, category }).then(result => {
                                                Navigate('/a',{replace:true})
                                                console.log(result)
                                                // dispatch(onAddNote())
                                                setIsOpen(false)
                                                title.setValue('')
                                                desc.setValue('')
                                                category.setValue('')
                                            })
                                        } else {
                                            alert('please login to save your notes')
                                            Navigate('/auth')
                                        }
                                    }}
                                >
                                    Add Note
                                </Button>
                            </>}
                        </Card>
                    </div>
                </div>
                <div className="mt-5">
                    {/* this outlet is to switching between [notes, edit labels, reminders, n such menus] */}
                    <Outlet />
                </div>
            </div>
        </>
    )
}


const useForm = (initValue) => {
    const [value, setValue] = useState(initValue)

    const onChange = (e) => {
        setValue(e.target.value)
    }
    return {
        value,
        setValue,
        onChange
    }
}
