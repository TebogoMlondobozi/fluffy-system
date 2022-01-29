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
  AdminPage,
  PaymentPage,
} from "../pages";
import AuthProvider from "../utils/contexts-providers/auth-provider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
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
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="cart/" element={<CartPage />}>
            <Route path=":id" element={<CartPage />} />
          </Route>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/admin/" element={<AdminPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
