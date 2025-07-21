import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { IconButton } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import SaveIcon from "@mui/icons-material/Save"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAuth } from "../../context/AuthContext"
import styles from "./ProductModal.module.css"
function ProductModal({ show, handleClose, product, refreshProducts }) {
  const { isAdmin } = useAuth()

  const [editMode, setEditMode] = useState(false)
  const [editedProduct, setEditedProduct] = useState(product)

  if (!product) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const productRef = doc(db, "products", product.id)
      await updateDoc(productRef, editedProduct)
      setEditMode(false)
      refreshProducts?.()
    } catch (error) {
      console.error("수정 오류:", error)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return
    try {
      const productRef = doc(db, "products", product.id)
      await deleteDoc(productRef)
      handleClose()
      refreshProducts?.()
    } catch (error) {
      console.error("삭제 오류:", error)
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>
          {editMode ? (
            <Form.Control
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              className={styles.modalTitleInput}
            />
          ) : (
            product.name
          )}
          {isAdmin && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                marginLeft: "0.5rem",
              }}
            >
              {editMode ? (
                <IconButton onClick={handleSave} aria-label="save" size="small">
                  <SaveIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => setEditMode(true)}
                  aria-label="edit"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              )}
              <IconButton
                onClick={handleDelete}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.productImage}
        />

        <Form>
          {[
            { label: "Category", name: "category" },
            { label: "Capacity", name: "capacity" },
            { label: "Type", name: "type" },
            { label: "Size", name: "size" },
            { label: "Description", name: "description" },
          ].map(({ label, name }) => (
            <Form.Group key={name} className="mb-2">
              <Form.Label>
                <strong>{label}:</strong>
              </Form.Label>
              {editMode ? (
                <Form.Control
                  type="text"
                  name={name}
                  value={editedProduct[name]}
                  onChange={handleChange}
                />
              ) : (
                <p>{product[name]}</p>
              )}
            </Form.Group>
          ))}
        </Form>
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
