import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/navigation";
import {
  AccountPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ShippingPage,
  CartPage,
  ShopPage,
  ProductPage,
} from "../pages";
import AuthProvider from "../utils/contexts-providers/auth-provider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="shop" element={<ShopPage />}>
            <Route path="all" element={<ShopPage />} />
            <Route path="shirts" element={<ShopPage />} />
            <Route path="trousers" element={<ShopPage />} />
            <Route path="suits" element={<ShopPage />} />
            <Route path="coats" element={<ShopPage />} />
            <Route path="blankets" element={<ShopPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
