import React from "react"
import Carousel from "../../components/Carousel"
import styles from "./CarouselSection.module.css"

const CarouselSection = () => {
  return (
    <div className={styles["carousel-section"]}>
      <Carousel />
    </div>
  )
}

export default CarouselSection
