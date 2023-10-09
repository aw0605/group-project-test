import React from "react";
import coupang from "../../assets/img/headerImg/Bakepang.png";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchBox>
      <form>
        <input
          className="input"
          type="search"
          placeholder="찾고 싶은 상품을 검색해보세요!"
        />
        <div className="icon"></div>
      </form>
    </SearchBox>
  );
};

export default SearchBar;

const SearchBox = styled.div`
  position: relative;
  text-align: center;
  width: 640px;
  height: 30px;
  margin: 0 5px;
  border: 0.1rem solid #4285f4;

  .input {
    padding-top: 7px;

    width: 100%;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;
