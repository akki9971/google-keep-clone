import React from 'react'
import { RiInboxArchiveLine } from 'react-icons/ri'


export const Archieve = () => {
  return (
    <div className="text-center">
      <p className="mt-5 " style={{ opacity: '0.3' }}><RiInboxArchiveLine size={90} /></p>
      <h1 className="text-muted" style={{ fontSize: 50 }}>There is no Archieves</h1>
    </div>
  )
}
