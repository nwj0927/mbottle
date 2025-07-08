import { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CompanyProfile from "./CompanyProfile"
import CompanyHistory from "./CompanyHistory"
import CompanyPhilosophy from "./CompanyPhilosophy" // ⬅ philosophy import
import { Nav } from "react-bootstrap"
import "./Company.css" // CSS import

// 사이드 네비게이터
const FloatingNavigator = ({ activeSection }) => {
  return (
    <Nav className="flex-column floating-navigator">
      <Nav.Link href="/company#profile" active={activeSection === "profile"}>
        회사 개요
      </Nav.Link>
      <Nav.Link href="/company#history" active={activeSection === "history"}>
        회사 연혁
      </Nav.Link>
      <Nav.Link
        href="/company#philosophy"
        active={activeSection === "philosophy"}
      >
        경영 이념
      </Nav.Link>
    </Nav>
  )
}

const CompanyPage = () => {
  const profileRef = useRef(null)
  const historyRef = useRef(null)
  const philosophyRef = useRef(null) // ⬅ 철학 섹션 ref 추가
  const location = useLocation()
  const [activeSection, setActiveSection] = useState("")

  // 페이지 로드시 해시 스크롤 이동
  useEffect(() => {
    const hash = location.hash.replace("#", "")
    if (hash === "profile" && profileRef.current) {
      profileRef.current.scrollIntoView({ behavior: "smooth" })
    } else if (hash === "history" && historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth" })
    } else if (hash === "philosophy" && philosophyRef.current) {
      philosophyRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [location])

  // 현재 활성 섹션 추적
  useEffect(() => {
    const handleScroll = () => {
      const profileTop = profileRef.current?.getBoundingClientRect().top ?? 0
      const historyTop = historyRef.current?.getBoundingClientRect().top ?? 0
      const philosophyTop =
        philosophyRef.current?.getBoundingClientRect().top ?? 0

      if (philosophyTop < 100) {
        setActiveSection("philosophy")
      } else if (historyTop < 100) {
        setActiveSection("history")
      } else if (profileTop < 100) {
        setActiveSection("profile")
      } else {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="App-section">
      {/* 사이드 네비게이터 */}
      <FloatingNavigator activeSection={activeSection} />

      {/* 본문 영역 */}
      <div ref={profileRef} id="profile">
        <CompanyProfile />
      </div>

      <div ref={historyRef} id="history">
        <CompanyHistory />
      </div>

      <div ref={philosophyRef} id="philosophy">
        <CompanyPhilosophy />
      </div>
    </section>
  )
}

export default CompanyPage
