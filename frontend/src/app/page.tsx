"use server";

import { NavBar } from "@components/navbar/navbar";
import { HomePageComponent } from "./(public)/home/home";

const RootPage = async () => {
  return (
    <>
      <NavBar />
      <HomePageComponent />
    </>
  );
};

export default RootPage;
