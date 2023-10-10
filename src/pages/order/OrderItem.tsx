import React, { FC } from "react";
import styled from "styled-components";
import { CartItemType } from "../../types";

type SelectedItemProps = {
  item: CartItemType;
};

const OrderItem: FC<SelectedItemProps> = ({ item }) => {
  return (
    <TR>
      <td>{item.product_name}</td>
      <td>수량 {item.amount}개</td>
    </TR>
  );
};

export default OrderItem;

const TR = styled.tr`
  width: 100%;
  td:first-child {
    width: 80%;
    font-size: 1rem;
    text-align: left;
    padding: 14px 0 0 14px;
  }
  td:last-child {
    width: 20%;
    font-size: 0.875rem;
    color: #929292;
    text-align: center;
    padding: 14px 0;
  }
`;
