import React from "react";
import dummydata from "../assets/mockdata";
import ProductItem from "./ProductItem";

type item = {
  id: number;
  title: string;
  price: number;
  img: string;
  desc: string;
  seller: string;
  storage: number;
};

const ProductsPage = () => {
  return (
    <div>
      {dummydata.map((item) => (
        <ProductItem item={item} />
      ))}
    </div>
  );
};

export default ProductsPage;
