import { BrowserRouter, Route, Routes } from "react-router-dom"
import React, { useEffect, useState } from "react"
import * as pages from "../pages/PagesIndex"
import Header from "../components/AppHeader"
import Footer from "../components/AppFooter"
import { auth, provider } from "../firebase" // provider도 임포트해야 합니다
import { signInWithPopup, signOut } from "firebase/auth"

const Router = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u)
    })
    return () => unsub()
  }, [])

  // 로그인 함수
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("로그인 실패:", error)
    }
  }

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("로그아웃 실패:", error)
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {/* user와 로그인/로그아웃 함수 같이 넘김 */}
          <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />
        </header>

        <Routes>
          <Route path="/" element={<pages.MainPage />} />
          <Route path="/board" element={<pages.Board />} />
          <Route path="/write" element={<pages.Write user={user} />} />
          <Route path="/edit/:id" element={<pages.Edit />} />
          <Route path="/post/:id" element={<pages.PostDetail />} />
          <Route path="/gallery" element={<pages.Company />} />
        </Routes>

        <footer className="Footer">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default Router
