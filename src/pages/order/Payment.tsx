import React, { FC, useState } from "react";
import styled from "styled-components";
import { UserType } from "../../types";

type UserProps = {
  userdata: UserType;
};

const Payment: FC<UserProps> = ({ userdata }) => {
  const [selectedPayment, setSelectedPayment] = useState("계좌이체");

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(e.target.value);
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
            <td>53000원</td>
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
                    id="신용/체크카드"
                    value="신용/체크카드"
                    checked={selectedPayment === "신용/체크카드"}
                    onChange={handlePaymentChange}
                  />
                  <label htmlFor="신용/체크카드">신용/체크카드</label>
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
                      <input type="text" />
                    </div>
                  </div>
                )}

                {selectedPayment === "신용/체크카드" && (
                  <div className="card">
                    <div className="card-info">
                      <select name="card" id="card">
                        <option value="농협은행">NH농협카드</option>
                        <option value="신한은행">신한카드</option>
                        <option value="국민은행">KB국민카드</option>
                        <option value="기업은행">삼성카드</option>
                        <option value="카카오뱅크">카카오뱅크카드</option>
                      </select>
                      <div className="card-number">
                        <span>카드번호</span>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="installment">
                      <select name="installment" id="installment">
                        <option value="일시불">일시불</option>
                        <option value="1개월">1개월(무이자)</option>
                        <option value="2개월">2개월(무이자)</option>
                        <option value="3개월">3개월</option>
                        <option value="4개월">4개월</option>
                      </select>
                      <span>* 할부는 50,000원 이상만 가능합니다.</span>
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
              </PaymentFormBox>
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
    font-size: 1rem;
  }
  span {
    margin-right: 5px;
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
