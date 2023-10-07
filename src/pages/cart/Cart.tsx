// import React, { useState, useEffect } from "react";
// import CartItem from "./CartItem";
// import axios from "axios";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [shippingCost, setShippingCost] = useState(0);

//   useEffect(() => {
//     // 백엔드에서 장바구니 정보를 가져오는 요청
//     axios
//       .get("/api/cart")
//       .then((response) => {
//         setCartItems(response.data.cartItems);
//         setTotalPrice(response.data.totalPrice);
//         setShippingCost(response.data.shippingCost);
//       })
//       .catch((error) => {
//         console.error("Error fetching cart data:", error);
//       });
//   }, []);

//   const handleRemoveItem = (itemId) => {
//     // 상품 삭제 요청을 백엔드로 보내고, 성공 시 cartItems 업데이트
//     axios
//       .delete(`/api/cart/${itemId}`)
//       .then(() => {
//         // 삭제된 상품을 cartItems에서 제거
//         setCartItems(cartItems.filter((item) => item.id !== itemId));
//       })
//       .catch((error) => {
//         console.error("Error removing item from cart:", error);
//       });
//   };

//   // ... 나머지 코드 (체크박스, 총 가격 계산 등)

//   return (
//     <div>
//       {cartItems.map((item) => (
//         <CartItem
//           key={item.id}
//           item={item}
//           onRemove={handleRemoveItem}
//           // ... 더 많은 props 전달
//         />
//       ))}
//       {/* 나머지 UI 및 결제 버튼 */}
//     </div>
//   );
// };

// export default CartPage;
import React, { FC, useState, useEffect } from "react";
import Axios from "axios";
import CartItem from "./CartItem";
import { MdArrowForwardIos } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";

import "./Cart.css";
import { cartItemType } from "../../types";

const Cart: FC = () => {
  const [cartItems, setCartItems] = useState<cartItemType[]>([]);

  useEffect(() => {
    // Axios를 사용하여 cartItemMockdata.json 파일에서 장바구니 데이터를 불러옵니다.
    Axios.get("/data/cartmockdata.JSON")
      .then((response) => {
        const data = response.data;
        setCartItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "장바구니 데이터를 불러오는 중 오류가 발생했습니다.",
          error
        );
      });
  }, []);

  return (
    <div>
      <div className="top-div">
        <div className="title-div">
          <TiShoppingCart />
          <h2>장바구니</h2>
        </div>
        <div className="step-div">
          <p>
            <span>01</span> 장바구니
          </p>
          <span>
            <MdArrowForwardIos />
          </span>
          <p>
            <span>02</span> 주문/결제dkdkdkdkdkdkdkdk
          </p>
        </div>
      </div>
      <div className="talbe-div">
        <div className="cart-amount">
          {/* 장바구니에 담긴 총 상품 개수 = api로 받아온 배열의 legnth */}
          <p>장바구니 상품 &#40; {cartItems.length} &#41;</p>
        </div>
        <table className="cartitem-table">
          <thead>
            <tr>
              <th colSpan={2}>
                <input type="checkbox" className="allcheck" />
                <span>전체선택</span>
              </th>
              <th colSpan={3}>상품정보</th>
              <th>상품금액</th>
              <th>배송비</th>
            </tr>
          </thead>
          <tbody>
            {/* 장바구니 api 받아와서 map으로 보여주기 */}
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="select-div">
        <input type="checkbox" />
        <p>전체 선택</p>
        <button>선택삭제</button>
      </div>
      <div className="price-div">
        <div className="total-product-price">
          <p>
            총 상품가격 <span>원</span>
          </p>
        </div>
        <p>+</p>
        <div className="total-shipping-price">
          <p>
            총 배송비 <span>원</span>
          </p>
        </div>
        <p>=</p>
        <div className="total-sum-price">
          <p>
            총 주문금액 <span>원</span>
          </p>
        </div>
      </div>
      <div className="bottom-div">
        <button>계속 쇼핑하기</button>
        <button>구매하기</button>
      </div>
    </div>
  );
};

export default Cart;
