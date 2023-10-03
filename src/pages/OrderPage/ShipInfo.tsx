import React, { useState } from "react";

const ShipInfo = ({ defaultAddress, onUpdateAddress }) => {
  const [address, setAddress] = useState(defaultAddress);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleUpdateAddress = () => {
    onUpdateAddress(address);
  };

  return (
    <div>
      <h2>배송 정보</h2>
      <p>기본 배송지: {defaultAddress}</p>
      <label>
        새로운 배송지:
        <input type="text" value={address} onChange={handleAddressChange} />
      </label>
      <button onClick={handleUpdateAddress}>배송지 변경</button>
    </div>
  );
};

export default ShipInfo;
