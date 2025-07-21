import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Router from "./shared/Router"
import { AuthProvider } from "./context/AuthContext"
import { AnimatePresence } from "framer-motion"
import { HashRouter } from "react-router-dom" // ✅ 추가

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        {" "}
        {/* ✅ 여기서 감싸줌 */}
        <AnimatePresence>
          <Router />
        </AnimatePresence>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
