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
      <img style={{ width: '80px', height: '60px' }} src='https://betall.ru/local/img/25_1.gif' alt='loader' />
    </div>
  )
}

export default Loader
