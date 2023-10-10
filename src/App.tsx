import React from "react";

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main/Main";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import OrderResult from "./pages/Order/OrderResult";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/login", // 로그인 페이지 경로
      element: <LoginPage />, // 로그인 페이지 컴포넌트
    },
    {
      path: "/signup", // 회원가입 페이지 경로
      element: <SignupPage />, // 회원가입 페이지 컴포넌트
    },
    {
      path: "/cart", // 장바구니 페이지 경로
      element: <Cart />, // 장바구니 페이지 컴포넌트
    },
    {
      path: "/order", // 주문,결제 페이지 경로
      element: <Order />,
    },
    {
      path: "/order/result", // 주문완료 페이지 경로
      element: <OrderResult />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
