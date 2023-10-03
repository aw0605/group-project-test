import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    // 백엔드에서 장바구니 정보를 가져오는 요청
    axios
      .get("/api/cart")
      .then((response) => {
        setCartItems(response.data.cartItems);
        setTotalPrice(response.data.totalPrice);
        setShippingCost(response.data.shippingCost);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const handleRemoveItem = (itemId) => {
    // 상품 삭제 요청을 백엔드로 보내고, 성공 시 cartItems 업데이트
    axios
      .delete(`/api/cart/${itemId}`)
      .then(() => {
        // 삭제된 상품을 cartItems에서 제거
        setCartItems(cartItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  // ... 나머지 코드 (체크박스, 총 가격 계산 등)

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={handleRemoveItem}
          // ... 더 많은 props 전달
        />
      ))}
      {/* 나머지 UI 및 결제 버튼 */}
    </div>
  );
};

export default CartPage;
