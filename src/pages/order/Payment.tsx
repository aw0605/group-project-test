import React, { FC, useState } from "react";
import styled from "styled-components";
import { CartItemType, UserType } from "../../types";

import { loadTossPayments } from "@tosspayments/payment-sdk";

type UserProps = {
  userdata: UserType;
  selectedItems: CartItemType[];
  totalOrderAmount: number;
};

const Payment: FC<UserProps> = ({
  userdata,
  selectedItems,
  totalOrderAmount,
}) => {
  const [selectedPayment, setSelectedPayment] = useState("계좌이체");

  const [accountNumber, setAccountNumber] = useState("");
  const [accountValid, setAccountValid] = useState(true);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(e.target.value);
    // 결제 방법이 변경될 때, 계좌번호 초기화 및 에러 상태 초기화
    setAccountNumber("");
    setAccountValid(true);
  };

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // 모두 숫자
    const isNumber = /^[0-9]*$/.test(e.target.value);
    // 모두 숫자이고 최대 14개인지
    if (isNumber && e.target.value.length <= 14) {
      setAccountNumber(e.target.value);
    }
  };
  // 입력된 계좌번호 값이 11개 이하이고 onBlur시 에러 메시지 띄우기
  const validateAccountNumber = () => {
    if (accountNumber.length === 0) {
      setAccountValid(true);
    } else if (accountNumber.length < 11) {
      setAccountValid(false);
    } else {
      setAccountValid(true);
    }
  };

  // // 토스 onclick으로 해보기
  // const handleTossPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();

  //   const tossClientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

  //   if (!tossClientKey) {
  //     console.error("토스 클라이언트 키가 설정되지 않았습니다.");
  //     return;
  //   }

  //   const tossPayment = await loadTossPayments(tossClientKey);

  //   tossPayment
  //     .requestPayment("카드", {
  //       amount: totalOrderAmount,
  //       orderId: Math.random().toString(36).slice(2),
  //       orderName: "주문",
  //       customerName: userdata.name,
  //     })
  //     .then(async function (data) {
  //       // 결제 승인 API 호출
  //       const { orderId, paymentKey, amount } = data;
  //       const secretKey = process.env.REACT_APP_TOSS_SECRET_KEY;

  //       const url = `https://api.tosspayments.com/v1/payments/confirm`;
  //       const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString(
  //         "base64"
  //       );

  //       const confirmResponse = fetch(url, {
  //         method: "post",
  //         body: JSON.stringify({
  //           amount,
  //           orderId,
  //           paymentKey,
  //         }),
  //         headers: {
  //           Authorization: `Basic ${basicToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }).then((response) => response.json());
  //       console.log("confirmResponse", confirmResponse);

  //       // const today = new Date();
  //       // const date = today.toDateString();

  //       // const paymentData = {
  //       //   userId: userdata.id,
  //       //   userEmail: userdata.email,
  //       //   order_date: date,
  //       //   orderAmount: amount,
  //       //   orderStatus: "주문수락",
  //       //   OrderItem: selectedItems,
  //       // };
  //     })
  //     .catch((error) => {
  //       console.error("토스 결제 중 오류발생,", error);
  //       if (error.code === "USER_CANCEL") {
  //         console.error("결제창이 닫아졌습니다.");
  //       }
  //     });
  // };
  const handleTossPay = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const tossClientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

    if (!tossClientKey) {
      console.error("토스 클라이언트 키가 설정되지 않았습니다.");
      return;
    }

    const tossPayment = await loadTossPayments(tossClientKey);

    tossPayment
      .requestPayment("카드", {
        amount: totalOrderAmount,
        orderId: Math.random().toString(36).slice(2),
        orderName: "주문",
        customerName: userdata.name,
      })
      .then(async function (data) {
        // 결제 승인 API 호출
        const { orderId, paymentKey, amount } = data;
        const secretKey = process.env.REACT_APP_TOSS_SECRET_KEY;

        const url = `https://api.tosspayments.com/v1/payments/confirm`;
        const basicToken = btoa(`${secretKey}:`); // Buffer 대신 btoa 사용

        const confirmResponse = fetch(url, {
          method: "post",
          body: JSON.stringify({
            amount,
            orderId,
            paymentKey,
          }),
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());
        console.log("confirmResponse", confirmResponse);
      })
      .catch((error) => {
        console.error("토스 결제 중 오류발생,", error);
        if (error.code === "USER_CANCEL") {
          console.error("결제창이 닫아졌습니다.");
        }
      });
  };

  return (
    <Wrap>
      <Title>결제정보</Title>
      <Table>
        <tbody>
          {/* <tr>
            <th>총상품가격</th>
            <td>50000원</td>
          </tr>
          <tr>
            <th>배송비</th>
            <td>3000원</td>
          </tr> */}
          <tr>
            <th>총결제금액</th>
            <td>{totalOrderAmount}원</td>
          </tr>
          <tr>
            <th>결제방법</th>
            <td>
              <SelectBox>
                <div>
                  <input
                    type="radio"
                    id="계좌이체"
                    value="계좌이체"
                    checked={selectedPayment === "계좌이체"}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="계좌이체">계좌이체</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="쿠페이머니"
                    value="쿠페이머니"
                    checked={selectedPayment === "쿠페이머니"}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="쿠페이머니">쿠페이머니</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="토스페이"
                    value="토스페이"
                    checked={selectedPayment === "토스페이"}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="토스페이">토스페이</label>
                </div>
              </SelectBox>
              <PaymentFormBox>
                {selectedPayment === "계좌이체" && (
                  <div className="account">
                    <select name="account" id="account">
                      <option value="농협은행">농협은행</option>
                      <option value="신한은행">신한은행</option>
                      <option value="국민은행">국민은행</option>
                      <option value="기업은행">기업은행</option>
                      <option value="카카오뱅크">카카오뱅크</option>
                    </select>
                    <div className="account-number">
                      <span>계좌번호</span>
                      <input
                        type="text"
                        value={accountNumber}
                        onChange={handleAccountNumberChange}
                        onBlur={validateAccountNumber}
                        placeholder="숫자만 입력하세요"
                      />
                    </div>
                  </div>
                )}

                {selectedPayment === "쿠페이머니" && (
                  <div className="paymoney">
                    <div className="paymoney-info">
                      <span>잔액</span>
                      <span>{userdata.paymoney}원</span>
                    </div>
                    <p>
                      * 잔액이 부족할 경우, 정상적인 결제가 이루어지지 않습니다.
                    </p>
                  </div>
                )}

                {selectedPayment === "토스페이" && (
                  <div className="tosspay">
                    <button onClick={handleTossPay}>토스로 결제하기</button>
                  </div>
                )}
              </PaymentFormBox>
              {!accountValid && (
                <ErrorAccountMessage>잘못된 계좌번호입니다</ErrorAccountMessage>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </Wrap>
  );
};

export default Payment;

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #373b3f;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-top: 2px solid #cecece;
  font-size: 0.875rem;
  tr {
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }
  th {
    width: 120px;
    font-weight: bold;
    text-align: right;
    padding: 14px 10px;
    border-right: 1px solid #ebebeb;
    background-color: #f4f4f4;
  }
  td {
    text-align: left;
    padding: 14px 10px;
  }
`;

const SelectBox = styled.div`
  display: flex;
  margin-bottom: 14px;
  div {
    margin-right: 10px;
  }
`;

const PaymentFormBox = styled.div`
  width: calc(100% - 20px);
  padding: 15px 10px;
  border: 2px solid #c5c7cd;
  background-color: #f4f6fa;
  select {
    padding: 3px;
    margin-right: 15px;
  }
  input {
    font-size: 0.875rem;
  }
  span {
    margin-right: 5px;
  }
  button {
    padding: 10px 25px;
    border-radius: 3px;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    background-color: #0078ff;
    cursor: pointer;
  }
  .account {
    display: flex;
  }
  .card-info {
    display: flex;
    padding-bottom: 14px;
    margin-bottom: 14px;
    border-bottom: 1px solid #a3a3a3;
  }
  .paymoney {
    .paymoney-info {
      padding-bottom: 14px;
      margin-bottom: 14px;
      border-bottom: 1px solid #a3a3a3;
      font-weight: 700;
      span:first-child {
        &::before {
          content: " • ";
        }
        margin-right: 20px;
      }
    }
    p {
      font-size: 0.75rem;
    }
  }
`;

const ErrorAccountMessage = styled.div`
  color: #fd0000;
  font-size: 0.875rem;
  font-weight: 700;
  margin: 10px 0 0 10px;
`;
