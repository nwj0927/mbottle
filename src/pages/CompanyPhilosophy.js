import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

const coreValues = [
  {
    title: "정밀함",
    description: "세심한 설계와 품질관리로 완성도를 높입니다.",
  },
  { title: "창의성", description: "감각적이고 차별화된 디자인을 개발합니다." },
  {
    title: "신뢰",
    description: "투명한 커뮤니케이션과 약속 이행을 중시합니다.",
  },
  {
    title: "전문성",
    description: "금형부터 후가공까지 전공정 대응력을 보유합니다.",
  },
  {
    title: "지속 가능성",
    description: "환경을 생각한 소재 및 생산을 지향합니다.",
  },
]

const CompanyPhilosophy = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold">경영이념</h2>

      {/* Mission & Vision */}
      <Row className="mb-4 justify-content-center">
        <Col md={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="mb-3 shadow-sm border-0 bg-light">
              <Card.Body>
                <h4 className="text-primary fw-bold">MISSION</h4>
                <p className="mb-0">
                  고객의 아이디어를 정밀하게 실현하는 화장품 용기 개발의
                  파트너로서, 기술력과 창의력을 바탕으로 아름다움과 신뢰를 함께
                  제공합니다.
                </p>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        <Col md={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="mb-3 shadow-sm border-0 bg-light">
              <Card.Body>
                <h4 className="text-success fw-bold">VISION</h4>
                <p className="mb-0">
                  감각적 디자인과 기술이 융합된 고품질 화장품 용기를 통해 K-뷰티
                  패키징을 선도하는 글로벌 브랜드로 성장합니다.
                </p>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Core Values */}
      <h5 className="text-center fw-semibold mt-5 mb-3 text-secondary">
        핵심 가치 (Core Values)
      </h5>
      <Row className="justify-content-center">
        {coreValues.map((value, idx) => (
          <Col key={idx} xs={12} md={6} lg={4} className="mb-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <h5 className="fw-bold text-dark">{value.title}</h5>
                  <p className="text-muted mb-0">{value.description}</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default CompanyPhilosophy
