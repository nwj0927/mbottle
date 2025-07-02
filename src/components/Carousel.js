import Carousel from "react-bootstrap/Carousel"
import image1 from "./Carousel/1.jpg"
import image2 from "./Carousel/2.jpg"
import image3 from "./Carousel/3.jpg"

function ControlledCarousel() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img src={image1} className="carousel-image" alt="CarouselImage" />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={image2} className="carousel-image" alt="CarouselImage" />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={image3} className="carousel-image" alt="CarouselImage" />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default ControlledCarousel
