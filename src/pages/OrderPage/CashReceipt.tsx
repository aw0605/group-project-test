import React, { useState } from "react";

const CashReceipt = ({ selectedPaymentMethod, onUpdateCashReceiptInfo }) => {
  const [incomeDeduction, setIncomeDeduction] = useState("소득공제");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [receiptNumber, setReceiptNumber] = useState("");

  const handleCashReceiptInfoUpdate = () => {
    onUpdateCashReceiptInfo(incomeDeduction, phoneNumber, receiptNumber);
  };

  return (
    <div>
      <h2>현금 영수증 정보</h2>
      {selectedPaymentMethod === "계좌이체" ||
      selectedPaymentMethod === "무통장입금" ? (
        <div>
          <label>
            현금 영수증 종류:
            <select
              value={incomeDeduction}
              onChange={(e) => setIncomeDeduction(e.target.value)}
            >
              <option value="소득공제">소득공제</option>
              <option value="지출증빙">지출증빙</option>
            </select>
          </label>
          <label>
            핸드폰 번호:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label>
            현금 영수증 번호:
            <input
              type="text"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
            />
          </label>
          <button onClick={handleCashReceiptInfoUpdate}>
            현금 영수증 정보 저장
          </button>
        </div>
      ) : (
        <p>선택한 결제 방법에는 현금 영수증이 적용되지 않습니다.</p>
      )}
    </div>
  );
};

export default CashReceipt;
