import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"
import "./CompanyHistory.css" // 선택: 커스텀 스타일

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

const CompanyHistory = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-5">회사 연혁</h2>
      <div className="timeline">
        {companyHistory.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
          >
            <Card className="shadow-sm border-0">
              <Card.Body className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                <div className="timeline-year text-primary fw-bold fs-4">
                  {item.year}
                </div>
                <div className="timeline-description fs-5 text-muted">
                  {item.description}
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  )
}

export default CompanyHistory
