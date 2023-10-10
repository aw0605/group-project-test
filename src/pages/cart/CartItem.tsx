import React, { FC } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
// import itemImg from "../../assets/img/itemImg.jpg";
import { CartItemType } from "../../types";

import {
  toggleSelectItem,
  deleteItem,
  updateItemAmount,
} from "../../redux/slice/cartSlice";
import { RootState } from "../../redux/store/store";

type CartItemProps = {
  item: CartItemType;
};

const CartItem: FC<CartItemProps> = ({ item }) => {
  const isSoldOut = item.amount > item.stock_quantity;

  const dispatch = useDispatch();

  const isSelected = useSelector((state: RootState) =>
    state.cart.selectedItems.some(
      (selectedItem) => selectedItem.product_id === item.product_id
    )
  );

  //해당 상품을 선택하거나 선택 취소합니다.
  const handleItemSelect = () => {
    dispatch(toggleSelectItem(item));
  };

  // const handleDelete = async (itemId: number) => {
  //   try {
  //     await axios.delete(`YOUR_API_ENDPOINT_HERE/${itemId}`);
  //     dispatch(deleteItem(itemId));
  //   } catch (error) {
  //     console.error("Error deleting the item:", error);
  //   }
  // };
  const handleDelete = (itemId: number) => {
    console.log("Before delete:", item); // 삭제 전 상태
    dispatch(deleteItem(itemId));
    console.log("After delete:", item); // 삭제 후 상태
  };

  // const handleAmountChange = async (changeType: "increment" | "decrement") => {
  //   const updatedAmount = changeType === "increment" ? item.amount + 1 : item.amount - 1;

  //   if(updatedAmount > 0) {
  //     try {
  //       await axios.put(`/api/users/${USER_ID_HERE}/cart`, {
  //         id: item.id,
  //         amount: updatedAmount
  //       });
  //       dispatch(updateItemAmount({ id: item.id, amount: updatedAmount }));
  //     } catch (error) {
  //       console.error(`Error ${changeType}ing the item amount:`, error);
  //     }
  //   }
  // };

  // // 감소시켜서 수량 0이되면 장바구니이ㅔ서 삭제되도록
  // const handleAmountChange = async (changeType: "increment" | "decrement") => {
  //   const updatedAmount = changeType === "increment" ? item.amount + 1 : item.amount - 1;

  //   if (updatedAmount > 0) {
  //     try {
  //       await axios.put(`/api/users/${USER_ID_HERE}/cart`, {
  //         id: item.id,
  //         amount: updatedAmount
  //       });
  //       dispatch(updateItemAmount({ id: item.id, amount: updatedAmount }));
  //     } catch (error) {
  //       console.error(`Error ${changeType}ing the item amount:`, error);
  //     }
  //   } else {
  //     try {
  //       // 수량이 0이 되면, 해당 아이템을 삭제
  //       await axios.delete(`/api/users/${USER_ID_HERE}/cart/${item.id}`);
  //       dispatch(deleteItem(item.id));
  //     } catch (error) {
  //       console.error(`Error deleting the item:`, error);
  //     }
  //   }
  // };

  const handleAmountChange = (changeType: "increment" | "decrement") => {
    const updatedAmount =
      changeType === "increment" ? item.amount + 1 : item.amount - 1;

    if (updatedAmount > 0) {
      // API 호출 부분을 주석 처리하고
      // await axios.put(`/api/users/${USER_ID_HERE}/cart`, {
      //   id: item.id,
      //   amount: updatedAmount
      // });

      dispatch(
        updateItemAmount({
          product_id: item.product_id,
          amount: updatedAmount,
        })
      );

      // 콘솔에 현재 수량과 변경 후 수량을 출력합니다.
      console.log(
        `Item ID: ${item.product_id}, Previous Amount: ${item.amount}, Updated Amount: ${updatedAmount}`
      );
    }
  };

  return (
    <>
      <tr>
        <td rowSpan={2}>
          <input
            type="checkbox"
            className="check"
            onChange={handleItemSelect}
            checked={isSelected}
            disabled={isSoldOut}
          />
        </td>
        <td rowSpan={2}>
          <ProductImg src={item.img1} alt="임시 이미지" />
        </td>
        <ProductInfo colSpan={3}>{item.product_name}</ProductInfo>
        <PriceInfo rowSpan={2}>
          {isSoldOut ? (
            <SoldOutText>품절</SoldOutText>
          ) : (
            `${item.price * item.amount}원`
          )}
        </PriceInfo>
        {/* <PriceInfo rowSpan={2}>
          {item.shippingprice === 0 ? "무료" : `${item.shippingprice}원`}
        </PriceInfo> */}
      </tr>
      <tr>
        <ProductInfo>{item.price}원</ProductInfo>
        <td>
          <AmountBox>
            <button onClick={() => handleAmountChange("increment")}>
              <MdKeyboardArrowUp />
            </button>
            {/* <p>{item.amount}</p> */}
            <input type="number" value={item.amount} readOnly />
            <button onClick={() => handleAmountChange("decrement")}>
              <MdKeyboardArrowDown />
            </button>
          </AmountBox>
        </td>
        <td>
          <DeleteButton onClick={() => handleDelete(item.product_id)}>
            X
          </DeleteButton>
        </td>
      </tr>
    </>
  );
};

export default CartItem;

const SoldOutText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #ff0000;
`;

const ProductImg = styled.img`
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

const ProductInfo = styled.td`
  text-align: left;
  font-size: 0.875rem;
`;

const PriceInfo = styled.td`
  text-align: center;
  font-size: 0.875rem;
`;

const AmountBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #767676;

  &:hover {
    button {
      opacity: 1;
    }
  }
  button {
    font-size: 1.25rem;
    border: none;
    background-color: transparent;
    transform: translateY(2px);
    padding: 0;
    cursor: pointer;
    opacity: 0;
  }
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input {
    width: 30px;
    border: none;
    font-size: 1rem;
    text-align: center;
    outline: none;
  }
`;

const DeleteButton = styled.button`
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: 1px solid #a6a6a6;
  font-size: 1rem;
  color: #a6a6a6;
  cursor: pointer;
`;
