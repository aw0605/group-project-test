export type UserType = {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  address: string;
  paymoney: number;
};

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  shippingprice: number;
  img: string;
  desc: string;
  category: string;
  seller: string;
  amount: number;
  storage: number;
};
