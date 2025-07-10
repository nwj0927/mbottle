import React from "react"
import { Container, Card } from "react-bootstrap"
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
import styles from "./CompanyProfile.module.css"

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
    <Container className={styles.container}>
      <motion.h2
        className={`${styles.title} fw-bold`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        회사 개요
      </motion.h2>

      <Card className={styles.card}>
        {companyInfo.map((item, idx) => (
          <motion.div
            key={idx}
            className={styles.infoRow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.value}>{item.value}</div>
          </motion.div>
        ))}
      </Card>
    </Container>
  )
}

export default CompanyProfile
