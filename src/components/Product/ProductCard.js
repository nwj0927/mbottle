import React from "react"
import { Card } from "react-bootstrap"

function ProductCard({ product, onClick }) {
  return (
    <Card
      className="mb-4"
      onClick={() => onClick(product)}
      style={{ cursor: "pointer" }}
    >
      <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.category}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
