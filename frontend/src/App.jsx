import { Route, Routes } from "react-router-dom";
import { Layout, PersistLogin, RequireAuth } from "./components";
import {
  Register,
  Login,
  Home,
  Admin,
  Editor,
  ErrorPage,
  Unauthorized,
  Profile,
} from "./pages";

const ROLES = {
  USER: "user",
  ADMIN: "admin",
  EDITOR: "editor",
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* protected routes */}

        <Route element={<PersistLogin />}>
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.EDITOR]}
              />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR]} />}>
            <Route path="/editor" element={<Editor />} />
          </Route>

          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.USER, ROLES.ADMIN, ROLES.EDITOR]}
              />
            }
          >
            <Route path="/profile/:id?" element={<Profile />} />
          </Route>
        </Route>

        {/* default route */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
