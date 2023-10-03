import React, { useState, useEffect } from "react";
import BuyerInfo from "./BuyerInfo";
import ShipInfo from "./ShipInfo";
import OrderList from "./OrderList";
import OrderItem from "./OrderItem";
import Payment from "./Payment";
import axios from "axios";

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  // ... 다른 state 변수들

  useEffect(() => {
    // 백엔드에서 주문 정보를 가져오는 요청
    axios
      .get("/api/orders")
      .then((response) => {
        setOrderItems(response.data.orderItems);
        setTotalPrice(response.data.totalPrice);
        setDiscountAmount(response.data.discountAmount);
        // ... 다른 주문 정보 업데이트
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, []);

  const handlePayment = () => {
    // 결제 정보를 서버로 전송하는 요청
    const paymentData = {
      orderItems,
      totalPrice,
      discountAmount,
      selectedCoupon,
      // ... 다른 결제 정보
    };

    axios
      .post("/api/payment", paymentData)
      .then((response) => {
        // 결제가 완료되면 다음 페이지로 이동
        window.location.href = "/order-complete";
      })
      .catch((error) => {
        console.error("Error making payment:", error);
      });
  };

  // ... 나머지 코드 (BuyerInfo, ShipInfo, OrderItem, OrderInfo, Payment 컴포넌트 렌더링)

  return (
    <div>
      {/* 각 컴포넌트 렌더링 */}
      {/* 결제 버튼 */}
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
};

export default OrderPage;
