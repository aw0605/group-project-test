import React from "react";
import OrderItem from "./OrderItem";

const OrderList = () => {
  return (
    <div>
      <div className="buyer-div">
        {/* cart에서 선택된 상품들 length로 배송 건수 나타내기 */}
        <h3>배송 2건</h3>
        <div className="table-div">
          <table>
            {/* OrderItem으로 cart에서 선택된 상품들 map을 통해 list로 보여주기 */}
            <OrderItem />
            <OrderItem />
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
