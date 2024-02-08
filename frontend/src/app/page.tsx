"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { SwitchButton } from "@components/navbar/switch-button";
import { HomePage } from "./(public)/home/page";

const RootPage = async () => {
  return (
    <>
      <NavbarComponent>
        <SwitchButton />
      </NavbarComponent>
      <HomePage />
    </>
  );
};

export default RootPage;
