import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

const companyHistory = [
  { year: "2020.03", description: "주식회사 엠보틀 설립" },
  { year: "2020.06", description: "AI 기반 병입 관리 시스템 개발 시작" },
  { year: "2021.01", description: "엠보틀 v1.0 제품 출시" },
  { year: "2021.12", description: "누적 거래처 100개 돌파" },
  { year: "2022.07", description: "스마트팩토리 연동 시스템 런칭" },
  { year: "2023.02", description: "ISO 9001 인증 획득" },
  { year: "2023.11", description: "해외 3개국 수출 개시" },
  { year: "2024.06", description: "AI 자동 최적화 시스템 'MB-AI' 출시" },
  { year: "2025.01", description: "국내 1,000개 병입 시설 도입 달성" },
]

const History = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold">회사 연혁</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          {companyHistory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="mb-3 shadow-sm border-0">
                <Card.Body className="d-flex">
                  <div
                    className="fw-bold text-primary"
                    style={{ minWidth: "100px" }}
                  >
                    {item.year}
                  </div>
                  <div>{item.description}</div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default History
