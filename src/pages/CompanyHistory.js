import React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  Flag,
  Star,
  WorkspacePremium,
  EmojiEvents,
  Public,
  TipsAndUpdates,
} from "@mui/icons-material"

import "./CompanyHistory.css" // 선택: 스타일 추가 가능

const companyHistory = [
  {
    year: "2020.03",
    description: "주식회사 엠보틀 설립",
    icon: <Flag color="primary" />,
  },
  {
    year: "2020.06",
    description: "AI 기반 병입 관리 시스템 개발 시작",
    icon: <TipsAndUpdates color="success" />,
  },
  {
    year: "2021.01",
    description: "엠보틀 v1.0 제품 출시",
    icon: <Star color="warning" />,
  },
  {
    year: "2021.12",
    description: "누적 거래처 100개 돌파",
    icon: <EmojiEvents color="secondary" />,
  },
  {
    year: "2022.07",
    description: "스마트팩토리 연동 시스템 런칭",
    icon: <TipsAndUpdates color="info" />,
  },
  {
    year: "2023.02",
    description: "ISO 9001 인증 획득",
    icon: <WorkspacePremium color="error" />,
  },
  {
    year: "2023.11",
    description: "해외 3개국 수출 개시",
    icon: <Public color="primary" />,
  },
  {
    year: "2024.06",
    description: "AI 자동 최적화 시스템 'MB-AI' 출시",
    icon: <TipsAndUpdates color="success" />,
  },
  {
    year: "2025.01",
    description: "국내 1,000개 병입 시설 도입 달성",
    icon: <EmojiEvents color="warning" />,
  },
]

const CompanyHistory = () => {
  return (
    <Container fluid className="py-5 bg-light">
      <h2 className="text-center fw-bold mb-5 display-5">회사 연혁</h2>
      <Row className="justify-content-center">
        <Col lg={10}>
          {companyHistory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="mb-4"
            >
              <Card className="shadow-sm border-0 bg-white">
                <Card.Body className="d-flex flex-column flex-md-row align-items-start gap-3 p-4">
                  <div className="d-flex align-items-center gap-3">
                    <div className="fs-3">{item.icon}</div>
                    <div className="text-primary fw-bold fs-4">{item.year}</div>
                  </div>
                  <div className="fs-5 text-muted">{item.description}</div>
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyHistory
