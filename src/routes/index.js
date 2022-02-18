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
  // ProductPage,
  AdminPage,
  PaymentPage,
  LegalPage,
} from "../pages";
import PaymentCancelled from "../pages/payment/cancelled-payment";
import PaymentSuccessful from "../pages/payment/successful-paymet";
import AuthProvider from "../utils/contexts-providers/auth-provider";
import OrderItemProvider from "../utils/contexts-providers/order-item-provider";
import OrderProvider from "../utils/contexts-providers/order-provider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/shop"
            element={
              <OrderItemProvider>
                <ShopPage />
              </OrderItemProvider>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <OrderProvider>
                  <AccountPage />
                </OrderProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <OrderProvider>
                  <PaymentPage />
                </OrderProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-successful"
            element={
              <ProtectedRoute>
                <OrderProvider>
                  <PaymentSuccessful />
                </OrderProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-cancelled"
            element={
              <ProtectedRoute>
                <OrderProvider>
                  <PaymentCancelled />
                </OrderProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="cart/"
            element={
              <OrderProvider>
                <OrderItemProvider>
                  <CartPage />
                </OrderItemProvider>
              </OrderProvider>
            }
          >
            <Route
              path=":id"
              element={
                <OrderItemProvider>
                  <CartPage />
                </OrderItemProvider>
              }
            />
          </Route>
          {/* <Route path="/product/:id" element={<ProductPage />} /> */}
          <Route path="/admin/" element={<AdminPage />} />
          <Route path="/terms-and-conditions/" element={<LegalPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
