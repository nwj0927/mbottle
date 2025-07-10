import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Router from "./shared/Router"
import { AuthProvider } from "./context/AuthContext"
import { AnimatePresence } from "framer-motion"
import { BrowserRouter } from "react-router-dom" // ✅ 추가

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {" "}
        {/* ✅ 여기서 감싸줌 */}
        <AnimatePresence>
          <Router />
        </AnimatePresence>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
