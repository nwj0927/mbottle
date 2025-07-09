import "./Pages.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Carousel from "../components/Carousel.js"
import { Container, Row, Col, Button, Card } from "react-bootstrap"

const products = [
  {
    title: "초정밀 CNC 머신",
    description: "정밀도와 내구성을 자랑하는 최신 CNC 장비입니다.",
    image: "/images/product1.jpg",
  },
  {
    title: "자동화 로봇 암",
    description: "산업 현장에서 효율을 극대화하는 스마트 로봇 암.",
    image: "/images/product2.jpg",
  },
  {
    title: "에코 에너지 모듈",
    description: "친환경 기술이 적용된 고효율 에너지 변환 장치.",
    image: "/images/product3.jpg",
  },
]

const MainPage = () => {
  return (
    <div>
      {/* 메인 슬라이더 영역 */}
      <section className="App-section">
        <Carousel />
      </section>

      {/* 회사 소개 영역 */}
      <section className="intro-section py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-4">신뢰와 혁신의 기업</h2>
              <p>
                저희 회사는 정밀한 기술력과 차별화된 서비스로 고객 만족을
                최우선으로 생각합니다. 끊임없는 연구개발과 품질 향상을 통해
                미래를 함께 만들어가고 있습니다.
              </p>
              <Button variant="primary" href="/about">
                회사소개 보기
              </Button>
            </Col>
            <Col md={6}>
              <img
                src="/images/company_intro.jpg"
                alt="회사 이미지"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* 신제품 소개 카드 영역 */}
      <section className="products-section py-5">
        <Container>
          <h3 className="mb-4 text-center">신제품 소개</h3>
          <Row>
            {products.map((product, index) => (
              <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.title}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Button variant="outline-primary" size="sm">
                      자세히 보기
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default MainPage
