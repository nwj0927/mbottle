import React, { useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import emailjs from "emailjs-com"

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    emailjs
      .send(
        "service_nf30mj9", // ex) service_xxx
        "template_i09dy0i", // ex) template_xxx
        formData,
        "nSneB9AR7hUFsv1xY" // ex) KJd34JKNLAF...
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text)
          setSubmitted(true)
        },
        (error) => {
          console.error("FAILED...", error.text)
          setError(true)
        }
      )
  }

  return (
    <div>
      <h2>Contact Us</h2>
      {submitted && (
        <Alert variant="success">문의가 성공적으로 접수되었습니다!</Alert>
      )}
      {error && (
        <Alert variant="danger">
          이메일 전송에 실패했습니다. 다시 시도해주세요.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="이름을 입력하세요"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일을 입력하세요"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>문의 내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="문의할 내용을 입력하세요"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          보내기
        </Button>
      </Form>
    </div>
  )
}

export default ContactForm
