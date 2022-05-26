import React from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'

export const TrashBin = () => {
  return (
    <div className="text-center" style={{}}>
      <p className="mt-5 pt-5" style={{ opacity: '0.3' }}><FaRegTrashAlt size={90} /></p>
      <h1 className="text-muted" style={{ fontSize: 50 }}>Your Trash is empty</h1>
    </div>
  )
}
