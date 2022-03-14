import React, { useEffect, useState } from 'react'
import { Fab } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    })
  }, [])

  return (
    <div>
      {showButton && (
        <Fab color='primary' aria-label='add' sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={scrollToTop}>
          <KeyboardArrowUp />
        </Fab>
      )}
    </div>
  )
}

export default ScrollToTop
