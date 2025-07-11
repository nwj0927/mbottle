import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../context/AuthContext"
import { Container, Card, Button, Form, Image } from "react-bootstrap"
import DeleteIcon from "@mui/icons-material/Delete"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import ArrowBackIcon from "@mui/icons-material/TableRows"
import "./QnaDetailPage.css"

function QnaDetailPage() {
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
      navigate("/qna/board")
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
    navigate(`/qna/edit/${id}`)
  }

  if (!post) return <div>로딩 중...</div>

  const isAuthor = user && post.uid === user.uid

  return (
    <Container className="qna-container">
      <Card>
        <Card.Body>
          {/* 제목 행 */}
          <div className="qna-header-row d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              {/* 목록 아이콘 (제목 왼쪽) */}
              <ArrowBackIcon
                className="qna-back-icon me-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/qna")}
              />
              <div className="qna-title">{post.title}</div>
            </div>
            {(isAuthor || isAdmin) && (
              <div className="qna-icons">
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
              </div>
            )}
          </div>

          {/* 작성자 + 날짜 */}
          <div className="qna-meta d-flex justify-content-between mb-2">
            <div>작성자: {post.author}</div>
            <div className="text-end flex-grow-1">
              {new Date(post.createdAt).toLocaleDateString("ko-KR")}
            </div>
          </div>

          {/* 이미지 */}
          {post.imageUrl && (
            <div className="my-3 text-center">
              <Image
                src={post.imageUrl}
                alt="첨부 이미지"
                fluid
                style={{ maxHeight: "400px" }}
              />
            </div>
          )}

          {/* 본문 */}
          <Card.Text className="qna-content">{post.content}</Card.Text>

          {/* 관리자 답변 필드 */}
          {isAdmin && (
            <div className="reply-form-wrapper mt-4 position-relative">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  readOnly={isReplySaved}
                  className={`reply-textarea ${
                    isReplySaved ? "saved-reply" : ""
                  }`}
                />
                <div className="reply-buttons-inside">
                  {!isReplySaved ? (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={handleReplySave}
                    >
                      답변 저장
                    </Button>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => setIsReplySaved(false)}
                      >
                        답변 수정하기
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={handleReplyDelete}
                      >
                        답변 삭제
                      </Button>
                    </>
                  )}
                </div>
              </Form.Group>
            </div>
          )}

          {/* 사용자용 관리자 답변 보기 */}
          {post.reply && !isAdmin && (
            <Card className="mt-4 bg-light qna-admin-reply">
              <Card.Body>
                <strong>M·Bottle</strong>
                <div style={{ whiteSpace: "pre-line" }}>{post.reply}</div>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default QnaDetailPage
