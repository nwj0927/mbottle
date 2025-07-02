import React from "react"
import { motion } from "framer-motion"
// motion 임포트하기!

const Wrapper = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export default Wrapper
