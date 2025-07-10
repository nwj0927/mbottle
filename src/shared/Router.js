import { Route, Routes, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"
import * as pages from "../pages/PagesIndex"
import Header from "../components/AppHeader"
import Footer from "../components/AppFooter"
import { auth, provider } from "../firebase"
import { signInWithPopup, signOut } from "firebase/auth"
import Wrapper from "../components/Wrapper"
import ScrollToTopButton from "../components/ScrollToTopButoon"
import Layout from "../components/Layout"

const Router = () => {
  const [user, setUser] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u))
    return () => unsub()
  }, [])

  // 해시 스크롤 보정
  useEffect(() => {
    const hash = location.hash?.replace("#", "")
    if (!hash) return

    setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) {
        const headerHeight =
          document.querySelector(".App-header")?.offsetHeight || 80
        const elTop = el.getBoundingClientRect().top + window.pageYOffset
        const scrollTo = elTop - headerHeight
        window.scrollTo({ top: scrollTo, behavior: "smooth" })
      }
    }, 0)
  }, [location])

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("로그인 실패:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("로그아웃 실패:", error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
      </header>

      <Wrapper>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <pages.HomePage />
              </Layout>
            }
          />
          <Route
            path="/qna"
            element={
              <Layout>
                <pages.QnaListPage />
              </Layout>
            }
          />
          <Route
            path="/qna/write"
            element={
              <Layout>
                <pages.QnaWritePage user={user} />
              </Layout>
            }
          />
          <Route
            path="/qna/edit/:id"
            element={
              <Layout>
                <pages.QnaEditPage />
              </Layout>
            }
          />
          <Route
            path="/qna/post/:id"
            element={
              <Layout>
                <pages.QnaDetailPage />
              </Layout>
            }
          />
          <Route
            path="/company"
            element={
              <Layout>
                <pages.CompanyPage />
              </Layout>
            }
          />
        </Routes>
      </Wrapper>

      <ScrollToTopButton />

      <footer className="Footer">
        <Footer />
      </footer>
    </div>
  )
}

export default Router
