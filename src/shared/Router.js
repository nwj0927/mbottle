import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
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

      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Layout>
                <Wrapper>
                  <pages.HomePage />
                </Wrapper>
              </Layout>
            }
          />
          <Route
            path="/product"
            element={
              <Layout>
                <Wrapper>
                  <pages.ProductListPage />
                </Wrapper>
              </Layout>
            }
          />
          <Route
            path="/product/upload"
            element={
              <Layout>
                <Wrapper>
                  <pages.ProductWritePage user={user} />
                </Wrapper>
              </Layout>
            }
          />
          <Route
            path="/qna"
            element={
              <Layout>
                <Wrapper>
                  <pages.QnaListPage />
                </Wrapper>
              </Layout>
            }
          />
          <Route
            path="/qna/write"
            element={
              <Layout>
                <Wrapper>
                  <pages.QnaWritePage user={user} />
                </Wrapper>
              </Layout>
            }
          />
          <Route
            path="/qna/edit/:id"
            element={
              <Layout>
                <Wrapper>
                  <pages.QnaEditPage />
                </Wrapper>
              </Layout>
            }
          />
          <Route
            path="/qna/post/:id"
            element={
              <Layout>
                <Wrapper>
                  <pages.QnaDetailPage />
                </Wrapper>
              </Layout>
            }
          />
          <Route
            path="/company"
            element={
              <Layout>
                <Wrapper>
                  <pages.CompanyPage />
                </Wrapper>
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <Wrapper>
                  <pages.ContactPage />
                </Wrapper>
              </Layout>
            }
          />
        </Routes>
      </AnimatePresence>

      <ScrollToTopButton />

      <footer className="Footer">
        <Footer />
      </footer>
    </div>
  )
}

export default Router
