import { useRef, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CompanyProfile from "./CompanyProfile"
import CompanyHistory from "./CompanyHistory"
import CompanyPhilosophy from "./CompanyPhilosophy"
import { Nav } from "react-bootstrap"
import "./Company.css"

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
  const philosophyRef = useRef(null)
  const location = useLocation()
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const hash = location.hash.replace("#", "")
    const refsMap = {
      profile: profileRef,
      history: historyRef,
      philosophy: philosophyRef,
    }
    const targetRef = refsMap[hash]

    if (targetRef && targetRef.current) {
      const headerHeight = window.innerHeight * 0.1 // 헤더 높이 10vh 가정
      const elementTop =
        targetRef.current.getBoundingClientRect().top + window.pageYOffset
      const scrollToPosition = elementTop - headerHeight

      window.scrollTo({ top: scrollToPosition, behavior: "smooth" })
    }
  }, [location])

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
      <FloatingNavigator activeSection={activeSection} />

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
