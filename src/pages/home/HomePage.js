import React from "react"
import CarouselSection from "./CarouselSection"
import ProductCards from "./ProductCards"
import styles from "./HomePage.module.css"

const HomePage = () => {
  return (
    <div>
      <section className={styles["homepage-carousel-section"]}>
        <CarouselSection />
      </section>

      <section className={`${styles["homepage-intro-section"]} py-5 bg-light`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="mb-4">신뢰와 혁신의 기업</h2>
              <p>
                저희 회사는 정밀한 기술력과 차별화된 서비스로 고객 만족을
                최우선으로 생각합니다. 끊임없는 연구개발과 품질 향상을 통해
                미래를 함께 만들어가고 있습니다.
              </p>
              <a href="/about" className="btn btn-primary">
                회사소개 보기
              </a>
            </div>
            <div className="col-md-6">
              <img
                src="/images/company_intro.jpg"
                alt="회사 이미지"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles["homepage-products-section"]} py-5`}>
        <div className="container">
          <h3 className="mb-4 text-center">신제품 소개</h3>
          <ProductCards />
        </div>
      </section>
    </div>
  )
}

export default HomePage
