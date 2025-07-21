import React from "react"
import { Card } from "react-bootstrap"
import styles from "./ProductCard.module.css"

function ProductCard({ product, onClick }) {
  return (
    <Card
      className="mb-4"
      onClick={() => onClick(product)}
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={product.imageUrl}
        alt={product.name}
        className={styles.squareImage}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.category}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
