import React from "react"
import { Container, Row, Col, Card, Table } from "react-bootstrap"
import { motion } from "framer-motion"
import {
  Business,
  CalendarToday,
  Person,
  Category,
  LocationOn,
  Inventory,
  Visibility,
} from "@mui/icons-material"
import "./CompanyProfile.css"
const companyInfo = [
  {
    label: "회사명",
    value: "주식회사 엠보틀 (M·Bottle Co., Ltd.)",
    icon: <Business />,
  },
  { label: "설립일", value: "2020년 3월 10일", icon: <CalendarToday /> },
  { label: "대표이사", value: "홍길동", icon: <Person /> },
  {
    label: "사업분야",
    value: "AI 기반 병입 자동화 시스템, 스마트팩토리 연동 솔루션",
    icon: <Category />,
  },
  {
    label: "소재지",
    value: "서울특별시 성동구 성수이로 00",
    icon: <LocationOn />,
  },
  {
    label: "주요 제품",
    value: "MB-AI, M·Bottle Manager, M·Cloud Analytics",
    icon: <Inventory />,
  },
  {
    label: "비전",
    value: "병입 산업의 새로운 기준을 만들다",
    icon: <Visibility />,
  },
]

const CompanyProfile = () => {
  return (
    <Container className="py-5">
      <motion.h2
        className="text-center mb-5 fw-bold display-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        회사 개요
      </motion.h2>
      <Row className="justify-content-center">
        <Col lg={10}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-sm border-0 rounded-4 bg-white">
              <Table responsive className="mb-0">
                <tbody>
                  {companyInfo.map((item, index) => (
                    <tr key={index}>
                      <th
                        className="align-middle bg-light text-dark fw-semibold"
                        style={{ width: "30%" }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ opacity: 0.5 }}>{item.icon}</span>
                          {item.label}
                        </div>
                      </th>
                      <td className="align-middle text-muted fs-6">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  )
}

export default CompanyProfile
