import React from "react";
import styled from "styled-components";
import menuBar from "../../assets/img/headerImg/menuBar.svg";

const Category = () => {
  return (
    <>
      <CategoryBox>
        <CategoryBtn>
          <img src={menuBar} />
          <p>카테고리</p>
        </CategoryBtn>
        <CategoryModalWarp>
          <CategoryModal>
            <Contents>
              <li>
                <a href="#"></a>
                <p>전체보기</p>
              </li>
              <li>
                <a href="#"></a>
                <p>식빵·빵류</p>
              </li>
              <li>
                <a href="#"></a>
                <p>잼·버터·스프레드</p>
              </li>
              <li>
                <a href="#"></a>
                <p>케이크·파이·디저트</p>
              </li>
            </Contents>
          </CategoryModal>
        </CategoryModalWarp>
      </CategoryBox>
    </>
  );
};

export default Category;

// const CategoryWarrper = styled.div`
//   width: 72vw;
//   margin: auto;
// `;

const CategoryBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: #4285f4;
  position: relative;
  cursor: pointer;
`;

const CategoryBtn = styled.div`
  position: absolute;
  top: 27%;
  left: 27%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > img {
    width: 35px;
    height: 35px;
    padding-left: 5px;
    margin-bottom: 8px;

    align-items: center;
  }
  > p {
    color: white;
    font-size: 0.6rem;
    text-align: center;
  }
`;

const CategoryModalWarp = styled.div`
  position: absolute;

  top: 105%;
  left: 10%;
  z-index: 99;
`;

const CategoryModal = styled.div`
  position: fixed;
  display: block;
  box-shadow: 0px 0px 5px #d9d8d8;
`;

const Contents = styled.ul`
  background-color: #fafafa;
  /* position: fixed;
	z-index: 10001;
	top: -10%;
	left: 10%; */
  width: 200px;
  border-radius: 3%;
  padding: 20px;
  li {
    list-style: none;
    opacity: 0.8;
    margin-bottom: 5px;
    text-align: left;
    a {
      text-decoration: none;
      p {
        color: #fff;
        font-size: 12px;
        margin-left: 15px;
        margin-bottom: 10px;
      }
    }
    &:hover {
      transition: 0;
      text-decoration: underline;
      font-weight: bold;
      opacity: 1;
    }
  }
`;
