import { Navigate, Routes, Route } from "react-router-dom"
import ProductsAdmin from "./pages/ProductsAdmin"
import Products from "./pages/Products"
import "./styles.scss"
import PageLayout from "./components/layouts/PageLayout"

function App() {
  return (
    <>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Products />}  />
            {/* <Route path="/" element={<Navigate to='/products' />}  /> */}
            <Route path="/admin/products" element={<ProductsAdmin/>}/>
            <Route path="/products" element={<Products/>}/>
          </Routes>
        </PageLayout>
    </>
  )
}

export default App
