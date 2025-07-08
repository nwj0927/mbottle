import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { Container, Card, Button, Form, Image, Row, Col } from "react-bootstrap"
import DeleteIcon from "@mui/icons-material/Delete"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import QuickreplyIcon from "@mui/icons-material/Quickreply"

import "./PostDetail.css"

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [reply, setReply] = useState("")
  const [isReplySaved, setIsReplySaved] = useState(false)
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
        setIsReplySaved(!!data.reply)
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
    setIsReplySaved(true)
  }

  const handleReplyDelete = async () => {
    await updateDoc(doc(db, "posts", id), { reply: "" })
    setReply("")
    setIsReplySaved(false)
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
          {/* 수정/삭제 아이콘 */}
          <div className="text-end">
            {(isAuthor || isAdmin) && (
              <>
                <DeleteIcon
                  color="action"
                  className="delete-icon"
                  onClick={handleDelete}
                />
                <ModeEditIcon
                  color="action"
                  className="delete-icon"
                  onClick={handleUpdate}
                />
              </>
            )}
          </div>

          {/* 작성자 정보 */}
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
                <Form.Label>
                  <QuickreplyIcon
                    color="gray"
                    className="quickreplyIcon-icon"
                  />
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  readOnly={isReplySaved}
                  className={isReplySaved ? "saved-reply" : ""}
                />
              </Form.Group>
              <div className="d-flex gap-2 mt-2">
                {!isReplySaved && (
                  <Button variant="primary" onClick={handleReplySave}>
                    답변 저장
                  </Button>
                )}
                {isReplySaved && (
                  <Button
                    variant="warning"
                    onClick={() => setIsReplySaved(false)}
                  >
                    답변 수정하기
                  </Button>
                )}
                {reply && (
                  <Button variant="outline-danger" onClick={handleReplyDelete}>
                    답변 삭제
                  </Button>
                )}
              </div>
            </>
          )}

          {/* 일반 사용자용 관리자 답변 보기 */}
          {post.reply && !isAdmin && (
            <Card className="mt-4 bg-light">
              <Card.Body>
                <strong>📌 관리자 답변:</strong>
                <div style={{ whiteSpace: "pre-line" }}>{post.reply}</div>
              </Card.Body>
            </Card>
          )}

          {/* 목록 보기 버튼 */}
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
