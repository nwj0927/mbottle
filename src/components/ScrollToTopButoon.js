import React, { useEffect, useState } from "react"
import { Button, Fade } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <Fade in={visible}>
      <Button
        onClick={scrollToTop}
        variant="contained"
        sx={{
          backgroundColor: "#e0e0e0", // 연한 회색
          "&:hover": {
            backgroundColor: "#9e9e9e", // 짙은 회색
          },
          position: "fixed",
          bottom: "20px",
          left: "20px",
          opacity: 0.6,
          borderRadius: "50%",
          minWidth: "50px",
          width: "50px",
          height: "50px",
          padding: 0,
          zIndex: 9999,
        }}
        aria-label="Scroll to top"
      >
        <KeyboardArrowUpIcon />
      </Button>
    </Fade>
  )
}

export default ScrollToTopButton
