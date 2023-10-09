import React from "react";
import styled from "styled-components";

const Form = ({ title }) => {
  return (
    <FormContainer>
      <div>
        <input type="email" placeholder="아이디(이메일)" />
        <div>
          <FormError>아이디(이메일)를 입력해주세요.</FormError>
        </div>
      </div>
      <div>
        <input type="password" placeholder="비밀번호" />
        <div>
          <FormError>비밀번호를 입력해주세요.</FormError>
        </div>
      </div>
      <button type="submit">{title}</button>
      <FormError></FormError>
    </FormContainer>
  );
};

export default Form;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
  }
  input {
    margin: 0;
    height: 48px;
    box-sizing: border-box;
    width: 100%;
    padding: 16px 0 12px;
    border: 1px solid #e8e8e8;
    background: none transparent;
    font-family: dotum, sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #111;
    font-weight: 700;
    text-indent: 12px;
    &::placeholder {
      color: #b1b1b1;
    }
    &:focus {
      border-bottom: 2px solid #e52528;
    }
  }
  button {
    width: 100%;
    font-family: apple sd gothic neo, malgun gothic, nanumbarungothic,
      nanumgothic, dotum, sans-serif;
    background: #346aff;
    color: #fff;
    font-weight: bold;
    padding: 12.5px 0;
    border-radius: 4px;
    font-size: 16px;
    box-shadow: none;
    line-height: 19px;
    border: none;

    /* &:hover {
			background: var(--second-color);
		} */
  }
`;

const FormError = styled.span`
  color: #e52528;
  display: block;
  margin: 9px 12px 0;
  padding: 0;
  font-family: dotum, sans-serif;
  font-size: 12px;
  line-height: 18px;
  cursor: default;
`;
