import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { Container, Table, Button, Row, Col } from "react-bootstrap"
import LockIcon from "@mui/icons-material/Lock"
import { useAuth } from "../context/AuthContext"
import "./Board.css" // ✅ 스타일 분리

function Board() {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"))
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )

      setPosts(sorted)
    }

    fetchPosts()
  }, [])

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    const yy = date.getFullYear().toString().slice(-2)
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    return `${yy}.${mm}.${dd}`
  }

  const handleTitleClick = (post) => {
    const isAuthor = user?.uid === post.uid

    if (isAdmin || isAuthor) {
      navigate(`/post/${post.id}`)
    } else {
      alert("해당 글은 작성자만 열람할 수 있습니다.")
    }
  }

  return (
    <Container className="board-container">
      <Table striped bordered hover className="board-table">
        <thead>
          <tr>
            <th className="col-no">번호</th>
            <th className="col-title">제목</th>
            <th className="col-author">작성자</th>
            <th className="col-date">작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, idx) => {
            const isAuthor = user?.uid === post.uid

            return (
              <tr key={post.id}>
                <td className="text-center">{posts.length - idx}</td>
                <td
                  className="post-title"
                  onClick={() => handleTitleClick(post)}
                >
                  {!isAdmin && !isAuthor && (
                    <LockIcon fontSize="small" className="lock-icon" />
                  )}
                  {post.title}
                </td>
                <td className="text-center">{post.author}</td>
                <td className="text-center">{formatDate(post.createdAt)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Row className="write-button-row">
        <Col className="text-end">
          {user && (
            <Button
              variant="primary"
              className="write-button"
              onClick={() => navigate("/write")}
            >
              ✍️ 글쓰기
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Board
