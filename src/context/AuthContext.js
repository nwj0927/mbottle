// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { ADMIN_EMAIL } from "../config/config"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const isAdmin = ADMIN_EMAIL.includes(user?.email)

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
