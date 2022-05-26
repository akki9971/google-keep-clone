import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import style from '../home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNote, editNote, getNotes, getOneNote } from '../../../services/apiService'
import { onFetchAllNotes } from '../../../redux/actions/NotesAction'
import { FaRegTrashAlt } from 'react-icons/fa'
import { AiOutlineEdit, AiOutlineBell, AiOutlineBulb } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'



export const Notes = () => {
  const [note, setNote] = useState({
    title: '',
    description: '',
    category: ''
  })
  const [openModel, setOpenModel] = useState(false)
  const notes = useSelector(state => state?.NotesReducer?.allNotes)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      getNotes(token).then(res => {
        // console.log(res);
        dispatch(onFetchAllNotes(res.data))
      })
    }
    // console.log(notes);
  }, [dispatch])

  return (
    <>
      {
        notes?.length > 0 ? (<Row className="p-3">
          {
            notes?.map((e, i) => {
              return <Col md={6} lg={4} key={i}>
                <Card
                  // onClick={(e) => {
                  //   e.target.style.backgroundColor = "#000"
                  // }} 
                  className={'my-3 ' + style.card}
                >
                  <Card.Body>
                    <Card.Title>
                      <span className={style.card_title}>{e.title}</span>
                    </Card.Title>
                    <Card.Text className={style.card_desc}>
                      {e.description}
                    </Card.Text>
                    <Card.Text className={style.card_cate}>
                      {e.category ? e.category : 'Personal Note'}
                    </Card.Text>
                    <Card.Text className={style.card_btns}>
                      <Button
                        variant="outline-info"
                        className="me-2 px-1 py-0"
                        onClick={() => {
                          deleteNote(e._id).then(() => {
                            // useEffect()
                            Navigate('/a', { replace: true })
                            console.log();
                          })
                        }}
                      >
                        <FaRegTrashAlt />
                      </Button>
                      <Button
                        variant="outline-info"
                        className="me-2 px-1 py-0"
                        onClick={() => {
                          getOneNote(e._id).then(({ data }) => {
                            // console.log(res)
                            setNote(data)
                            setOpenModel(true)
                          })
                        }}
                      >
                        <AiOutlineEdit />
                      </Button>
                      <Button variant="outline-info" className="me-2 px-1 py-0" >
                        <AiOutlineBell />
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            })
          }
        </Row>) : (
          <div className="text-center" style={{}}>
            <p className="" style={{ opacity: '0.3' }}><AiOutlineBulb size={120} /></p>
            <h1 className="text-muted" style={{ fontSize: 50 }}>Your Cloud is empty</h1>
          </div>
        )
      }
      {
        openModel && <>
          <div className={style.mymodal}>
            <p><span>title</span><input value={note?.title} type="text" onChange={(e) => setNote({ ...note, title: e.target.value })} /></p>
            <p><span>description</span><input value={note?.description} type="text" onChange={(e) => setNote({ ...note, description: e.target.value })} /></p>
            <p><span>category</span><input value={note?.category} type="text" onChange={(e) => setNote({ ...note, category: e.target.value })} /></p>
            <p>
              <button
                onClick={() => {
                  setNote({
                    title: '',
                    description: '',
                    category: ''
                  })
                  setOpenModel(false)
                }}>cancel</button>
              <button
                onClick={() => {
                  let { _id, title, description, category } = note
                  editNote({ _id, title, description, category }).then(res => {
                    setNote({
                      title: '',
                      description: '',
                      category: ''
                    })
                    setOpenModel(false)
                    Navigate('/a')
                  })
                }}
              >edit and save</button></p>
          </div>
          <div className={style.darkOverlay}></div>
        </>
      }
    </>
  )
}
