"use server";

import { NavbarComponent } from "@components/navbar/navbar";
import { Icon } from "@components/icon/icon";
import { PageListComponent } from "@components/page-list";
import { SwitchButton } from "@components/navbar/switch-button";

const HomePage = async () => {
  const iconClasses = "text-xl text-blue-500 pointer-events-none flex-shrink-0";

  const pages = [
    {
      name: "Home",
      path: "/",
      icon: Icon({
        name: "Groups",
        className: iconClasses,
      }),
    },
    {
      name: "Profile",
      path: "/profile",
      icon: Icon({
        name: "Groups",
        className: iconClasses,
      }),
    },
    {
      name: "Group",
      path: "/group",
      icon: Icon({
        name: "Groups",
        className: iconClasses,
      }),
    },
    {
      name: "Transaction",
      path: "/transaction",
      icon: Icon({
        name: "Groups",
        className: iconClasses,
      }),
    },
  ];

  return (
    <>
      <NavbarComponent>
        <SwitchButton />
      </NavbarComponent>
      <PageListComponent pages={pages} />
    </>
  );
};

export default HomePage;
