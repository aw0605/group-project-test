import React from "react";
import { Link } from "react-router-dom";
import SignIn from "./sing-in/Signin";
import styled from "styled-components";
import Bakepang from "../../assets/img/headerImg/Bakepang.png";

const LoginPage = () => {
  return (
    <div className="page">
      <Container>
        <h1>
          <Link to={"/"}>
            <img src={Bakepang} alt="로고" />
          </Link>
        </h1>
        <LoginWrap>
          <div>
            <a href="#">이메일 로그인</a>
            <a href="#">간편 로그인</a>
          </div>
        </LoginWrap>
        <SignIn />
        <hr />
        <SignupButton>
          <Link to={"/signup"}>회원가입</Link>
        </SignupButton>
      </Container>
    </div>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100vw;
  max-width: 460px;
  min-width: 290px;
  margin: 0 auto;

  h1 {
    margin: 0 auto;

    text-align: center;
    img {
      position: relative;
      display: block;
      width: 100%;
      max-width: 195px;
      max-height: 46px;
      margin: 0 auto;
      background-position: 50% 50%;
      padding-top: 10%;
      background-size: cover;
    }
  }
  hr {
    height: 1px;
    border: 0;
    background-color: #c8d1d8;
  }
`;

const LoginWrap = styled.div`
  position: relative;
  display: flex;

  div {
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-top: 24px;
    display: flex;
    justify-content: space-around;

    a {
      padding: 14px 0;
      color: #454f5b;
      text-align: center;
      text-decoration: none;
    }
  }
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 11.5px 0;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: none;
  line-height: 19px;
  background: #fff;

  border: 1px solid #919eab;
  margin-top: 16px;
  a {
    text-decoration: none;
    color: #454f5b;
    font-weight: bold;
  }
`;
