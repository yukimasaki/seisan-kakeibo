"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { HomePage } from "./(public)/home/home";

const RootPage = async () => {
  return (
    <>
      <NavbarComponent />
      <HomePage />
    </>
  );
};

export default RootPage;
