import React, { FC } from "react";
import { cartItemType } from "../../types";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

type CartItemProps = {
  item: cartItemType;
};

const CartItem: FC<CartItemProps> = ({ item }) => {
  return (
    <>
      <tr>
        <td rowSpan={2}>
          <input type="checkbox" />
        </td>
        <td rowSpan={2}>
          <img src={item.img} alt={item.title} width="100" height="100" />
        </td>
        <td>
          {item.title}, {item.desc}
        </td>
        <td rowSpan={2}>
          <input type="text" value={item.amount} />
          <div>
            <button>
              <MdKeyboardArrowUp />
            </button>
            <button>
              <MdKeyboardArrowDown />
            </button>
          </div>
        </td>
        <td rowSpan={2}>
          <button>X</button>
        </td>
        <td rowSpan={2}>{item.amount * item.price}</td>
        <td rowSpan={2}>
          {item.shippingprice === 0 ? "무료" : item.shippingprice}
        </td>
      </tr>
      <tr>
        <td>{item.price}</td>
      </tr>
    </>
  );
};

export default CartItem;
