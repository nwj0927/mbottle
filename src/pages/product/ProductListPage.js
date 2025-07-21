import React, { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { Container, Row, Col, Button, Tab, Tabs } from "react-bootstrap"
import ProductCard from "../../components/Product/ProductCard"
import ProductModal from "../../components/Product/ProductModal"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import styles from "./ProductListPage.module.css"

function ProductListPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeTab, setActiveTab] = useState("전체")
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"))
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setProducts(items)

    const cats = ["전체", ...new Set(items.map((item) => item.category))]
    setCategories(cats)
  }
  useEffect(() => {
    async function fetchProducts() {
      const snapshot = await getDocs(collection(db, "products"))
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setProducts(items)

      const cats = ["전체", ...new Set(items.map((item) => item.category))]
      setCategories(cats)
    }
    fetchProducts()
  }, [])

  const filteredProducts =
    activeTab === "전체"
      ? products
      : products.filter((p) => p.category === activeTab)

  return (
    <Container className={styles.container}>
      <h3 className={styles.title}>제품 목록</h3>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className={styles.categoryTabs}
        justify
      >
        {categories.map((cat) => (
          <Tab eventKey={cat} title={cat} key={cat}>
            <Row xs={1} sm={2} md={3} lg={5} className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.id}>
                  <ProductCard
                    product={product}
                    onClick={() => setSelectedProduct(product)}
                  />
                </Col>
              ))}
            </Row>
          </Tab>
        ))}
      </Tabs>

      {selectedProduct && (
        <ProductModal
          show={!!selectedProduct}
          handleClose={() => setSelectedProduct(null)}
          product={selectedProduct}
          refreshProducts={fetchProducts} // 👈 여기!
        />
      )}

      {isAdmin && (
        <div className={styles.writeButtonWrapper}>
          <Button variant="primary" onClick={() => navigate("/product/upload")}>
            제품 등록하기
          </Button>
        </div>
      )}
    </Container>
  )
}

export default ProductListPage
