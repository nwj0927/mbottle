import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
// import { useAuth } from "../context/AuthContext"
import { Container, Table, Button, Row, Col } from "react-bootstrap"

function Board() {
  const [posts, setPosts] = useState([])
  // const { isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      const snapshot = await getDocs(collection(db, "posts"))
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setPosts(data.reverse()) // 최신 글 먼저
    }

    fetchPosts()
  }, [])

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("ko-KR")
  }

  return (
    <Container style={{ maxWidth: "100%" }}>
      <Row className="align-items-center mb-3">
        <Col>
          <h3>📋 게시판</h3>
        </Col>
        <Col className="text-end">
          {/* 
          *** 관리자만 쓸 수 있게 할 경우
          {isAdmin && (
            <Button variant="primary" onClick={() => navigate("/write")}>
              ✍️ 글쓰기
            </Button>
          )} */}
          <Button variant="primary" onClick={() => navigate("/write")}>
            ✍️ 글쓰기
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, idx) => (
            <tr key={post.id}>
              <td>{posts.length - idx}</td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {post.title}
              </td>
              <td>{post.author}</td>
              <td>{formatDate(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default Board
