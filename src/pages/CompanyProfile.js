import React from "react"
import { Container, Row, Col, Table } from "react-bootstrap"
import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

const companyInfo = [
  ["회사명", "주식회사 엠보틀 (M·Bottle Co., Ltd.)"],
  ["설립일", "2020년 3월 10일"],
  ["대표이사", "홍길동"],
  ["사업분야", "AI 기반 병입 자동화 시스템, 스마트팩토리 연동 솔루션"],
  ["소재지", "서울특별시 성동구 성수이로 00"],
  ["주요 제품", "MB-AI, M·Bottle Manager, M·Cloud Analytics"],
  ["비전", "병입 산업의 새로운 기준을 만들다"],
]

const CompanyProfile = () => {
  return (
    <Container className="py-5">
      <motion.h2
        className="text-center mb-5 fw-bold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        회사 개요
      </motion.h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Table bordered hover>
              <tbody>
                {companyInfo.map(([label, value], index) => (
                  <tr key={index}>
                    <th style={{ width: "30%" }}>{label}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </motion.div>
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyProfile
