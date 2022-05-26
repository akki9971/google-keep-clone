import React from 'react'
import { AiOutlineBell } from 'react-icons/ai'
export const Reminder = () => {
  return (
    <div className="text-center">
      <p className="mt-5 " style={{ opacity: '0.3' }}><AiOutlineBell size={90} /></p>
      <h1 className="text-muted" style={{ fontSize: 50 }}>There is no Reminders</h1>
    </div>
  )
}
