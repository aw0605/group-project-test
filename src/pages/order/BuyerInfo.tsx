import React, { FC } from "react";
import { userType } from "../../types";

type UserProps = {
  userData: userType;
};

const BuyerInfo: FC<UserProps> = ({ userData }) => {
  return (
    <div>
      <div className="buyer-div">
        <h3>구매자정보</h3>
        <div className="table-div">
          <table>
            <tr>
              <th>이름</th>
              <td>{userData.name}</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>{userData.email}</td>
            </tr>
            <tr>
              <th>휴대폰 번호</th>
              <td>
                <input type="text" value={userData.phone} />
                <button>수정</button>
                <p>
                  * 인증 번호를 못 받았다면, 1577-7011 번호 차단 및 스팸 설정을
                  확인해 주세요.
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BuyerInfo;
