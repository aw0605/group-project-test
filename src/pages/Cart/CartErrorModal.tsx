import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

type CartErrorModalProps = {
  message: string;
  onClose: () => void;
};

const CartErrorModal: React.FC<CartErrorModalProps> = ({
  message,
  onClose,
}) => {
  return ReactDOM.createPortal(
    <ModalWrapper>
      <ModalContent>
        <p>{message}</p>
        <div>
          <button onClick={onClose}>확인</button>
        </div>
      </ModalContent>
    </ModalWrapper>,
    document.getElementById("cartmodal-root")! // HTML에서 modal-root라는 id를 가진 엘리먼트에 렌더링됩니다.
  );
};

export default CartErrorModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  min-width: 250px;
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  p {
    font-size: 1.125rem;
    font-weight: 700;
    color: #303030;
    margin-bottom: 20px;
  }
  button {
    width: 75px;
    padding: 5px 0;
    font-size: 0.875rem;
    border: 1px solid #0073e9;
    background-color: transparent;
    border-radius: 3px;
    text-align: center;
    color: #0073e9;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #0073e9;
    }
  }
`;
