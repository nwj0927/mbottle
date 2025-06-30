import "./Pages.css"
import "bootstrap/dist/css/bootstrap.min.css"
import logo from "../logo.svg"
import testC from "../layout/Carousel"

const MainPage = () => {
  return (
    <section className="App-section">
      <img src={logo} className="App-logo" alt="logo" />

      <p>
        {`
          Editsssssssssssss
          Editsssssssssssss
          Editsssssssssssss
          Editsssssssssssss
          Editsssssssssssss
          Editsssssssssssss
          Editsssssssssssss
          \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n
          \n 
          `}
        <code>src/App.js</code> and save to reload.
      </p>

      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <testC />
    </section>
  )
}

export default MainPage
