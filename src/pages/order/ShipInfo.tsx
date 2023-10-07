// import React, { useState } from "react";

// const ShipInfo = ({ defaultAddress, onUpdateAddress }) => {
//   const [address, setAddress] = useState(defaultAddress);

//   const handleAddressChange = (e) => {
//     setAddress(e.target.value);
//   };

//   const handleUpdateAddress = () => {
//     onUpdateAddress(address);
//   };

//   return (
//     <div>
//       <h2>배송 정보</h2>
//       <p>기본 배송지: {defaultAddress}</p>
//       <label>
//         새로운 배송지:
//         <input type="text" value={address} onChange={handleAddressChange} />
//       </label>
//       <button onClick={handleUpdateAddress}>배송지 변경</button>
//     </div>
//   );
// };

// export default ShipInfo;
import React, { FC } from "react";
import { userType } from "../../types";

type UserProps = {
  userData: userType;
};

const ShipInfo: FC<UserProps> = ({ userData }) => {
  return (
    <div>
      <div className="buyer-div">
        <h3>받는사람정보</h3>
        <button>배송지변경</button>
        <div className="table-div">
          <table>
            <tr>
              <th>이름</th>
              <td>{userData.name}</td>
            </tr>
            <tr>
              <th>배송주소</th>
              <td>{userData.address}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>{userData.phone}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipInfo;
