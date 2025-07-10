import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../context/AuthContext"
import { Container, Form, Button, Spinner } from "react-bootstrap"

function QnaEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, loading, isAdmin } = useAuth()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loadingPost, setLoadingPost] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        // 본인 글인지 확인
        if (data.uid !== user?.uid && !isAdmin) {
          alert("작성자만 수정할 수 있습니다.")
          navigate("/")
          return
        }
        setTitle(data.title)
        setContent(data.content)
        setLoadingPost(false)
      } else {
        alert("게시글을 찾을 수 없습니다.")
        navigate("/")
      }
    }

    if (!loading && user) {
      fetchPost()
    }
  }, [id, user, loading, isAdmin, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateDoc(doc(db, "posts", id), {
      title,
      content,
    })
    alert("수정이 완료되었습니다.")
    navigate(`/post/${id}`)
  }

  if (loading || loadingPost) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>게시글 불러오는 중...</p>
      </Container>
    )
  }

  return (
    <Container style={{ maxWidth: "100%" }}>
      <h3 className="mb-4">📝 게시글 수정</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="내용"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-end">
          <Button variant="success" type="submit">
            저장하기
          </Button>{" "}
          <Button variant="secondary" onClick={() => navigate(`/post/${id}`)}>
            취소
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default QnaEditPage
