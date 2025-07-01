import { BrowserRouter, Route, Routes } from "react-router-dom"
import * as pages from "../pages/PagesIndex"
import CarouselTEST from "../layout/Carousel"
import Header from "../components/AppHeader"
import Footer from "../components/AppFooter"
const Router = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<pages.MainPage />} />
          <Route path="/" element={<CarouselTEST />} />
          <Route path="/gallery" element={<pages.Company />}>
            {/* <Route path=":cardId" element={<DetailCard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      <footer className="Footer">
        <Footer />
      </footer>
    </div>
  )
}

export default Router
