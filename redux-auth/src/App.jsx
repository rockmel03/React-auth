import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, Public } from "./components";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import Login from "./features/auth/Login";
import UsersList from "./features/users/UsersList";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected Routes  */}
        <Route element={<RequireAuth />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
