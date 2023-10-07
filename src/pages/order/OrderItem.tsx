// import React from "react";

// const OrderItem = ({ item }) => {
//   return (
//     <div>
//       <h3>{item.productName}</h3>
//       <p>수량: {item.quantity}</p>
//       <p>배송비: {item.shippingCost}원</p>
//     </div>
//   );
// };

// export default OrderItem;
import React from "react";

const OrderItem = () => {
  return (
    <tr>
      <td>상품명, 상품 세부설명</td>
      <td>상품수량 / 배송비</td>
    </tr>
  );
};

export default OrderItem;
