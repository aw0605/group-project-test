import React, { FC } from "react";
import styled from "styled-components";
import { UserType } from "../../types";

type UserProps = {
  userdata: UserType;
};

const ShipInfo: FC<UserProps> = ({ userdata }) => {
  return (
    <Wrap>
      <Title>받는사람정보</Title>
      <div className="table-div">
        <Table>
          <tbody>
            <tr>
              <th>이름</th>
              <td>{userdata.name}</td>
            </tr>
            <tr>
              <th>연락처</th>
              <td>{userdata.phone}</td>
            </tr>
            <tr>
              <th>배송주소</th>
              <td>{userdata.address}</td>
            </tr>
            <tr>
              <th>배송 요청사항</th>
              <td>
                <select name="shiprequest" id="shiprequest">
                  <option value="문 앞">문 앞</option>
                  <option value="직접 받고 부재 시 문 앞">
                    직접 받고 부재 시 문 앞
                  </option>
                  <option value="경비실">경비실</option>
                  <option value="택배함">택배함</option>
                </select>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Wrap>
  );
};

export default ShipInfo;

const Wrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #373b3f;
  margin-bottom: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-top: 2px solid #cecece;
  font-size: 0.875rem;
  tr {
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }
  th {
    width: 120px;
    font-weight: bold;
    text-align: right;
    padding: 14px 10px;
    border-right: 1px solid #ebebeb;
    background-color: #f4f4f4;
  }
  td {
    text-align: left;
    padding: 14px 10px;
  }
  select {
    padding: 3px;
  }
`;
