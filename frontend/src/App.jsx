import { Toaster, toast } from "sonner"
import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./page/HomePage"
import Notfound from "./page/Notfound"

function App() {
  return (
    <>
      <Toaster />
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
