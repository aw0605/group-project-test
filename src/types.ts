export type userType = {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  address: string;
};

export type cartItemType = {
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
