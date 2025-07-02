import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Router from "./shared/Router"
import { AuthProvider } from "./context/AuthContext"
import { AnimatePresence } from "framer-motion"

function App() {
  return (
    <AuthProvider>
      <AnimatePresence>
        <Router />
      </AnimatePresence>
    </AuthProvider>
  )
}

export default App
