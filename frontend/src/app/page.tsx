"use server";

import { NavBar } from "@components/navbar/NavBar";
import { HomePage } from "./(public)/home/home";

const RootPage = async () => {
  return (
    <>
      <NavBar />
      <HomePage />
    </>
  );
};

export default RootPage;
