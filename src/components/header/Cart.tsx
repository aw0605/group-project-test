import React from "react";
import cart from "../../assets/img/headerImg/cart.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <IconWrapper>
      <Link to={"/cart"}>
        <img src={cart} />
        <p>장바구니</p>
      </Link>
    </IconWrapper>
  );
};

export default Cart;

const IconWrapper = styled.div`
  cursor: pointer;
  margin-left: 10px;
  img {
    width: 50px;
    height: 30px;
    padding-bottom: 5px;
  }
  p {
    font-size: 0.6rem;
    text-align: center;
  }
  a {
    text-decoration: none;
    color: #000;
  }
`;
