"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { HomePageComponent } from "./(public)/home/home";

const RootPage = async () => {
  return (
    <>
      <NavbarComponent />
      <HomePageComponent />
    </>
  );
};

export default RootPage;
