import React from "react";
import ExchangeBanner from "../components/Banner/ExchangeBanner";
 import IndexBanner from "../components/Banner/IndexBanner";
import ExchangeTable from "../components/ExchangeTable";
 
import IndexTable from "../components/IndexTable";
 
const Exchanges = () => {
  return (
    <>
      <ExchangeBanner />
      <ExchangeTable />
    </>
  );
};

export default Exchanges;
