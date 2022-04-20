import { CircularProgress } from '@mui/material'
import React from 'react'

export const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        zIndex: '9999',
        backgroundColor: 'var(--background)',
      }}>
      <CircularProgress />
    </div>
  )
}

export default Loader
