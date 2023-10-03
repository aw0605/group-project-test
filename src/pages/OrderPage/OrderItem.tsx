import React from "react";

const OrderItem = ({ item }) => {
  return (
    <div>
      <h3>{item.productName}</h3>
      <p>수량: {item.quantity}</p>
      <p>배송비: {item.shippingCost}원</p>
    </div>
  );
};

export default OrderItem;
