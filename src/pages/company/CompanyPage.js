import { useRef, useEffect, useState } from "react"
import CompanyProfile from "./CompanyProfile"
import CompanyHistory from "./CompanyHistory"
import CompanyPhilosophy from "./CompanyPhilosophy"
import { Nav } from "react-bootstrap"
import styles from "./CompanyPage.module.css"

const FloatingNavigator = ({ activeSection }) => {
  return (
    <Nav className={`${styles.floatingNavigator}`}>
      <Nav.Link
        href="/company#profile"
        className={`${styles.navLink} ${
          activeSection === "profile" ? styles.navLinkActive : ""
        }`}
      >
        회사 개요
      </Nav.Link>
      <Nav.Link
        href="/company#history"
        className={`${styles.navLink} ${
          activeSection === "history" ? styles.navLinkActive : ""
        }`}
      >
        회사 연혁
      </Nav.Link>
      <Nav.Link
        href="/company#philosophy"
        className={`${styles.navLink} ${
          activeSection === "philosophy" ? styles.navLinkActive : ""
        }`}
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
  const [activeSection, setActiveSection] = useState("")

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
    <section className={styles.section}>
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
