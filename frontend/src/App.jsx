import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./page/HomePage"
import Notfound from "./page/Notfound"

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Notfound />} />
          
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
