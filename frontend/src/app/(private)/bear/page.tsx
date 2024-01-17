"use server";

import { HeaderComponent } from "@components/header";
import { BearComponent } from "./bear";

const BearsPage = () => {
  return (
    <>
      <HeaderComponent />
      <BearComponent />
    </>
  );
}

export default BearsPage;
