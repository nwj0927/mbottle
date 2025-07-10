import React from "react"
import { Row, Col, Card, Button } from "react-bootstrap"
import styles from "./ProductCards.module.css"

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

const ProductCards = () => {
  return (
    <Row>
      {products.map((product, index) => (
        <Col md={4} sm={6} xs={12} className="mb-4" key={index}>
          <Card className={`h-100 shadow-sm ${styles.productCard}`}>
            <Card.Img variant="top" src={product.image} alt={product.title} />
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
  )
}

export default ProductCards
