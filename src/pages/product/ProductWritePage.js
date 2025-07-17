import React from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { Container } from "react-bootstrap"
import ProductForm from "../../components/Product/ProductForm"
import { useAuth } from "../../context/AuthContext"

function ProductWritePage() {
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()

  // 관리자 아니면 접근 제한
  React.useEffect(() => {
    if (!isAdmin) {
      alert("제품 등록 권한이 없습니다.")
      navigate("/product")
    }
  }, [isAdmin, navigate])

  const handleSubmit = async (formData) => {
    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        createdAt: new Date().toISOString(),
      })
      alert("제품이 등록되었습니다.")
      navigate("/product")
    } catch (error) {
      console.error("제품 등록 실패", error)
      alert("제품 등록에 실패했습니다.")
    }
  }

  if (!isAdmin) return null // 권한 없으면 렌더링 안함

  return (
    <Container className="my-4">
      <h3 className="text-center mb-4">제품 등록</h3>
      <ProductForm onSubmit={handleSubmit} />
    </Container>
  )
}

export default ProductWritePage
