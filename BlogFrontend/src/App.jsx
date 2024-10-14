import { HomePage, BlogDetail, LoginPage } from "./pages"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./services/AuthContex"

export default function App() {
  return (
    <div>
        <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/blog/:id" element={<BlogDetail />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </AuthProvider>
    </div>
  )
}
