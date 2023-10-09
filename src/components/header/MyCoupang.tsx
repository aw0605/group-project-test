import React from "react";
import mycoupang from "../../assets/img/headerImg/myPage.svg";
import styled from "styled-components";

const MyCoupang = () => {
  return (
    <IconWrapper>
      <img src={mycoupang} />
      <p>마이페이지</p>
    </IconWrapper>
  );
};

export default MyCoupang;

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
`;
