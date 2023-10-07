// import React, { useState, useEffect } from "react";
// import BuyerInfo from "./BuyerInfo";
// import ShipInfo from "./ShipInfo";
// import OrderList from "./OrderList";
// import OrderItem from "./OrderItem";
// import Payment from "./Payment";
// import axios from "axios";

// const OrderPage = () => {
//   const [orderItems, setOrderItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [selectedCoupon, setSelectedCoupon] = useState(null);
//   // ... 다른 state 변수들

//   useEffect(() => {
//     // 백엔드에서 주문 정보를 가져오는 요청
//     axios
//       .get("/api/orders")
//       .then((response) => {
//         setOrderItems(response.data.orderItems);
//         setTotalPrice(response.data.totalPrice);
//         setDiscountAmount(response.data.discountAmount);
//         // ... 다른 주문 정보 업데이트
//       })
//       .catch((error) => {
//         console.error("Error fetching order data:", error);
//       });
//   }, []);

//   const handlePayment = () => {
//     // 결제 정보를 서버로 전송하는 요청
//     const paymentData = {
//       orderItems,
//       totalPrice,
//       discountAmount,
//       selectedCoupon,
//       // ... 다른 결제 정보
//     };

//     axios
//       .post("/api/payment", paymentData)
//       .then((response) => {
//         // 결제가 완료되면 다음 페이지로 이동
//         window.location.href = "/order-complete";
//       })
//       .catch((error) => {
//         console.error("Error making payment:", error);
//       });
//   };

//   // ... 나머지 코드 (BuyerInfo, ShipInfo, OrderItem, OrderInfo, Payment 컴포넌트 렌더링)

//   return (
//     <div>
//       {/* 각 컴포넌트 렌더링 */}
//       {/* 결제 버튼 */}
//       <button onClick={handlePayment}>결제하기</button>
//     </div>
//   );
// };

// export default OrderPage;
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { MdArrowForwardIos } from "react-icons/md";
import BuyerInfo from "./BuyerInfo";
import { userType } from "../../types";
import ShipInfo from "./ShipInfo";
import OrderList from "./OrderList";
import Payment from "./Payment";

const Order = () => {
  const [userData, setUserData] = useState<userType>({
    // 초기값을 빈 객체로 설정
    name: "",
    nickname: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Axios를 사용하여 usermockdata.json 파일에서 장바구니 데이터를 불러옵니다.
    Axios.get("/data/usermockdata.JSON")
      .then((response) => {
        const data = response.data;
        setUserData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "사용자 데이터를 불러오는 중 오류가 발생했습니다.",
          error
        );
      });
  }, []);

  return (
    <div>
      <div className="top-div">
        <div className="title-div">
          <h2>주문/결제</h2>
        </div>
        <div className="step-div">
          <p>
            <span>01</span> 장바구니
          </p>
          <span>
            <MdArrowForwardIos />
          </span>
          <p>
            <span>02</span> 주문/결제
          </p>
        </div>
      </div>
      <div className="contents-div">
        <BuyerInfo userData={userData} />
        <ShipInfo userData={userData} />
        <OrderList />
        <Payment />
      </div>
    </div>
  );
};

export default Order;
