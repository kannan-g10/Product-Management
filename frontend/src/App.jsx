import { Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { useState } from "react";
import NotFound from "./pages/NotFounud";

function App() {
  const [user, setUser] = useState(localStorage.getItem("accesstoken"));
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
}

export default App;
