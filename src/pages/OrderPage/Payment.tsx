import React, { useState } from "react";

const Payment = ({ onPayment }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardInfo, setCardInfo] = useState({ cardNumber: "", installment: "" });

  const handlePayment = () => {
    onPayment(selectedMethod, cardInfo);
  };

  return (
    <div>
      <h2>결제 정보</h2>
      <div>
        <label>
          결제 방법:
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            <option value="계좌이체">계좌이체</option>
            <option value="신용/체크카드">신용/체크카드</option>
            <option value="카카오페이">카카오페이</option>
            <option value="무통장입금">무통장입금</option>
          </select>
        </label>
      </div>
      {selectedMethod === "신용/체크카드" && (
        <div>
          <label>
            카드 번호:
            <input
              type="text"
              value={cardInfo.cardNumber}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, cardNumber: e.target.value })
              }
            />
          </label>
          <label>
            할부 기간:
            <select
              value={cardInfo.installment}
              onChange={(e) =>
                setCardInfo({ ...cardInfo, installment: e.target.value })
              }
            >
              <option value="일시불">일시불</option>
              <option value="1개월">1개월</option>
              <option value="2개월">2개월</option>
              {/* 기타 할부 옵션들 */}
            </select>
          </label>
        </div>
      )}
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
};

export default Payment;
