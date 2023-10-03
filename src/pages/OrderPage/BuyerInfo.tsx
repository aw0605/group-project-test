import React from "react";

const BuyerInfo = ({ userData }) => {
  return (
    <div>
      <h2>구매자 정보</h2>
      <p>이름: {userData.name}</p>
      <p>이메일: {userData.email}</p>
      <p>핸드폰 번호: {userData.phone}</p>
    </div>
  );
};

export default BuyerInfo;
