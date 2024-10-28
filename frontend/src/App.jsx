import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Register, Login, Home, Admin, Editor, ErrorPage } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* protected routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/editor" element={<Editor />} />

        {/* default route */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
