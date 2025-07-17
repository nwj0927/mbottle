import React, { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import styles from "./ProductForm.module.css"

function ProductForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    capacity: "",
    type: "",
    size: "",
    description: "",
    imageUrl: "",
  })

  const [categories, setCategories] = useState([])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // products 컬렉션에서 기존 category 값들 중복 없이 가져오기
  useEffect(() => {
    async function fetchCategoriesFromProducts() {
      const snapshot = await getDocs(collection(db, "products"))
      const items = snapshot.docs.map((doc) => doc.data())
      // category가 빈 값 아니고 중복 제거
      const uniqueCategories = [
        ...new Set(items.map((item) => item.category).filter(Boolean)),
      ]
      setCategories(uniqueCategories)
    }
    fetchCategoriesFromProducts()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === "category") {
      const filtered = categories.filter((cat) =>
        cat.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredCategories(filtered)
      setShowSuggestions(true)
    }
  }

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category })
    setShowSuggestions(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* 제품명 등 기존 필드 */}
      <Form.Group className="mb-2">
        <Form.Control
          name="name"
          placeholder="제품명"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* 카테고리 입력 및 자동완성 레이어 */}
      <Form.Group className="mb-2 position-relative">
        <Form.Control
          name="category"
          placeholder="카테고리"
          value={formData.category}
          onChange={handleChange}
          autoComplete="off"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          required
        />
        {showSuggestions && filteredCategories.length > 0 && (
          <ul className={styles.suggestionBox}>
            {filteredCategories.map((cat, idx) => (
              <li
                key={idx}
                className={styles.suggestionItem}
                onClick={() => handleCategorySelect(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </Form.Group>

      {/* 나머지 필드 */}
      <Form.Group className="mb-2">
        <Form.Control
          name="capacity"
          placeholder="용량"
          value={formData.capacity}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          name="type"
          placeholder="타입"
          value={formData.type}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Control
          name="size"
          placeholder="사이즈"
          value={formData.size}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          name="description"
          rows={3}
          placeholder="설명"
          value={formData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          name="imageUrl"
          placeholder="이미지 URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        제품 등록
      </Button>
    </Form>
  )
}

export default ProductForm
