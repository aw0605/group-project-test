import React, { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import bakepang from "../../assets/img/headerImg/Bakepang.png";
import BuyerInfo from "./BuyerInfo";
import ShipInfo from "./ShipInfo";
import OrderList from "./OrderList";
import Payment from "./Payment";
import { UserType, CartItemType } from "../../types";

import { setItems } from "../../redux/slice/cartSlice";

const OrderPage: FC = () => {
  const [userdata, setUserData] = useState<UserType | null>(null);

  useEffect(() => {
    axios
      .get(
        "https://3c2167fb-e55d-4327-8405-a650c719e040.mock.pstmn.io/user/profile"
      )
      .then((res) => {
        const data = res.data;
        console.log(data.profile);
        setUserData(data.profile);
      })
      .catch((error) => {
        console.error("사용자 정보를 불러오던 중 오류 발생", error);
      });
  }, []);

  // const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const savedSelectedItems = sessionStorage.getItem("selectedItems");
    if (savedSelectedItems) {
      const parsedItems: CartItemType[] = JSON.parse(savedSelectedItems);
      setSelectedItems(parsedItems);
    }
  }, []);

  //   const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://3c2167fb-e55d-4327-8405-a650c719e040.mock.pstmn.io/payment",
  //       {
  //         userData: userdata,  // 주문자 정보
  //         items: selectedItems // 주문 목록
  //       }
  //     );
  //     if (response.status === 200) {
  //       console.log("주문이 성공적으로 완료되었습니다.");
  //       // 성공 시 다른 페이지로 이동하거나 사용자에게 메시지 표시 등의 후속 조치를 수행할 수 있습니다.
  //     } else {
  //       console.error("주문 실패:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("주문 중 오류 발생:", error);
  //   }
  // };

  const handlePayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("User Data:", userdata);
    console.log("Selected Items:", selectedItems);
  };

  return (
    <Wrap>
      <Logo>
        <Link to={"/"}>
          <img src={bakepang} alt="로고" />
        </Link>
      </Logo>
      <Container>
        <HeaderWrap>
          <TitleWrap>
            <h2>주문/결제</h2>
          </TitleWrap>
          <StepWrap>
            <div>
              <span>01</span>
              <p>장바구니</p>
            </div>
            <span>
              <MdArrowForwardIos color="#afafaf" />
            </span>
            <OrderStep>
              <span>02</span>
              <p>주문/결제</p>
            </OrderStep>
          </StepWrap>
        </HeaderWrap>
        <Form>
          {userdata && (
            <ContentsWrap>
              <BuyerInfo userdata={userdata} />
              <ShipInfo userdata={userdata} />
              <OrderList selectedItems={selectedItems} />
              <Payment userdata={userdata} />
            </ContentsWrap>
          )}
          <AgreeBox>
            <input type="checkbox" required />
            <span>
              위 주문 내용을 확인하였으며, 회원 본인은 개인정보 이용 및
              제공(해외직구의 경우 국외제공) 및 결제에 동의합니다.
            </span>
          </AgreeBox>
          <ButtonWrap>
            <PaymentButton onClick={handlePayment}>결제하기</PaymentButton>
          </ButtonWrap>
        </Form>
      </Container>
    </Wrap>
  );
};

export default OrderPage;

const Wrap = styled.div`
  width: 100%;
  padding: 10px 0;
  margin: 0 auto;
  background-color: #f2f2f2;
`;

const Logo = styled.div`
  width: calc(72vw + 80px);
  margin: 0 auto;
  padding: 20px 0 10px;
  img {
    width: 140px;
  }
`;
const Container = styled.div`
  width: 72vw;
  border: 1px solid #e0e0e0;
  margin: 0 auto 70px;
  padding: 40px 39px;
  background: #fff;
`;

const HeaderWrap = styled.div`
  width: 100%;
  padding: 20px 0 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid #2f2f2f;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  color: #2f2f2f;
  font-size: 1.6rem;
  font-weight: 500;
  font-weight: bold;
`;

const StepWrap = styled.div`
  display: flex;
  color: #d4d4d4;
  span {
    font-size: 1rem;
    font-weight: bold;
    margin: 0 2px;
  }
  p {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const OrderStep = styled.div`
  span {
    font-size: 1rem;
    color: #299fe0;
    font-weight: bold;
  }
  p {
    display: inline-block;
    font-size: 0.8rem;
    font-weight: bold;
    color: #000;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const ContentsWrap = styled.div``;

const AgreeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  span {
    font-size: 0.875rem;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PaymentButton = styled.button`
  font-size: 1.375rem;
  font-weight: 700;
  display: inline-block;
  width: 216px;
  line-height: 18px;
  border: 2px solid #0073e9;
  border-radius: 4px;
  padding: 22px 0 19px;
  text-align: center;
  background-color: #0073e9;
  color: #fff;
  cursor: pointer;
`;
