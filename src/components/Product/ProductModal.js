import React from "react"
import { Modal, Button } from "react-bootstrap"

function ProductModal({ show, handleClose, product }) {
  if (!product) return null

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Capacity:</strong> {product.capacity}
        </p>
        <p>
          <strong>Type:</strong> {product.type}
        </p>
        <p>
          <strong>Size:</strong> {product.size}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductModal
