import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../context/AuthContext"
import { Container, Form, Button } from "react-bootstrap"
import "./QnaWritePage.css" // ✅ CSS 파일 import

function QnaWritePage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      alert("로그인이 필요합니다.")
      navigate("/qna")
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    await addDoc(collection(db, "posts"), {
      title,
      content,
      author: user.displayName,
      uid: user.uid,
      createdAt: new Date().toISOString(),
    })

    navigate("/qna")
  }

  if (loading) return <div>로딩중...</div>

  return (
    <Container className="qna-write-container">
      {/* <h3 className="qna-write-title">✍️ 글쓰기</h3> */}
      {/**
       *
       * 해당부분 CarouselSection.js 들어가는 곳
       *
       */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="내용을 입력하세요"
            rows={6}
            className="qna-write-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <div className="qna-write-button-wrapper">
          <Button variant="success" type="submit">
            등록하기
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default QnaWritePage
