import { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CompanyProfile from "./CompanyProfile"
import CompanyHistory from "./CompanyHistory"
import { Nav } from "react-bootstrap"
import "./Company.css" // CSS import

const FloatingNavigator = ({ activeSection }) => {
  return (
    <Nav className="flex-column floating-navigator">
      <Nav.Link href="/company#profile" active={activeSection === "profile"}>
        회사 개요
      </Nav.Link>
      <Nav.Link href="/company#history" active={activeSection === "history"}>
        회사 연혁
      </Nav.Link>
    </Nav>
  )
}

const CompanyPage = () => {
  const profileRef = useRef(null)
  const historyRef = useRef(null)
  const location = useLocation()
  const [activeSection, setActiveSection] = useState("")

  // 스크롤 이동
  useEffect(() => {
    const hash = location.hash.replace("#", "")
    if (hash === "profile" && profileRef.current) {
      profileRef.current.scrollIntoView({ behavior: "smooth" })
    } else if (hash === "history" && historyRef.current) {
      historyRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [location])

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      const profileTop = profileRef.current?.getBoundingClientRect().top ?? 0
      const historyTop = historyRef.current?.getBoundingClientRect().top ?? 0

      if (historyTop < 100) {
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

      {/* 페이지 본문 */}
      <div ref={profileRef} id="profile">
        <CompanyProfile />
      </div>

      <div ref={historyRef} id="history">
        <CompanyHistory />
      </div>
    </section>
  )
}

export default CompanyPage
