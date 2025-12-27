import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./Context/Context";
import AppContext from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};


function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isAuthenticated } = useContext(AppContext);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    console.log("Selected category:", category);
  };
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar onSelectCategory={handleCategorySelect}
         />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <Home addToCart={addToCart} selectedCategory={selectedCategory}
              />
            }
          />
          <Route path="/add_product" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AddProduct /></ProtectedRoute>} />
          <Route path="/product" element={<Product  />} />
          <Route path="product/:id" element={<Product  />} />
          <Route path="/cart" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Cart /></ProtectedRoute>} />
          <Route path="/product/update/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProduct /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
