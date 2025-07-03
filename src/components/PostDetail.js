import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { Container, Card, Button, Form, Image, Row, Col } from "react-bootstrap"
import DeleteIcon from "@mui/icons-material/Delete"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import "./PostDetail.css"

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [reply, setReply] = useState("")
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "posts", id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setPost(data)
        setReply(data.reply || "")
      }
    }
    fetchPost()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, "posts", id))
      navigate("/board")
    }
  }

  const handleReplySave = async () => {
    await updateDoc(doc(db, "posts", id), { reply })
    alert("답변이 저장되었습니다.")
  }

  const handleReplyDelete = async () => {
    await updateDoc(doc(db, "posts", id), { reply: "" })
    setReply("")
    alert("답변이 삭제되었습니다.")
  }

  const handleUpdate = () => {
    navigate(`/edit/${id}`)
  }

  if (!post) return <div>로딩 중...</div>

  const isAuthor = user && post.uid === user.uid

  return (
    <Container style={{ maxWidth: "100%" }}>
      <Card>
        <Card.Header>{post.title}</Card.Header>
        <Card.Body>
          {/* 제목 */}
          <div className="text-end">
            {(isAuthor || isAdmin) && (
              <DeleteIcon
                color="action"
                className="delete-icon"
                onClick={handleDelete}
              />
            )}
            {(isAuthor || isAdmin) && (
              <ModeEditIcon
                color="action"
                className="delete-icon"
                onClick={handleUpdate}
              />
            )}
          </div>
          <Card.Subtitle className="mb-2 text-muted">
            작성자: {post.author} <br />
            작성일: {new Date(post.createdAt).toLocaleDateString("ko-KR")}
          </Card.Subtitle>

          {/* 이미지 */}
          {post.imageUrl && (
            <div className="my-3">
              <Image
                src={post.imageUrl}
                alt="첨부 이미지"
                fluid
                style={{ maxHeight: "400px" }}
              />
            </div>
          )}

          {/* 본문 */}
          <Card.Text style={{ whiteSpace: "pre-line", marginTop: "20px" }}>
            {post.content}
          </Card.Text>

          {/* 관리자 답변 필드 */}
          {isAdmin && (
            <>
              <Form.Group className="mt-4">
                <Form.Label>📌 관리자 답변</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex gap-2 mt-2">
                <Button variant="primary" onClick={handleReplySave}>
                  답변 저장
                </Button>
                {reply && (
                  <Button variant="outline-danger" onClick={handleReplyDelete}>
                    답변 삭제
                  </Button>
                )}
              </div>
            </>
          )}

          {/* 일반 사용자에게 보이는 답변 */}
          {post.reply && !isAdmin && (
            <Card className="mt-4 bg-light">
              <Card.Body>
                <strong>📌 관리자 답변:</strong>
                <div style={{ whiteSpace: "pre-line" }}>{post.reply}</div>
              </Card.Body>
            </Card>
          )}

          {/* 하단 버튼들 */}
          <Row className="mt-4">
            <Col></Col>
            <Col className="text-end">
              <Button variant="secondary" onClick={() => navigate("/board")}>
                목록보기
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default PostDetail
