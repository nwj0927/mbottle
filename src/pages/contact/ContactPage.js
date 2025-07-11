import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import ContactInfo from "./ContactInfo"
import ContactForm from "./ContactForm"
import ContactMap from "./ContactMap"

function ContactPage() {
  return (
    <Container className="my-5">
      <Row>
        {/* <Col md={4} sm={12}>
          <ContactInfo />
        </Col> */}

        <Col md={4} sm={12}>
          <ContactForm />
        </Col>

        <Col md={8} sm={12}>
          <ContactMap />
        </Col>
      </Row>
    </Container>
  )
}

export default ContactPage
