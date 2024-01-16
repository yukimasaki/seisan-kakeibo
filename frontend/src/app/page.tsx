"use server";

import { HeaderComponent } from "@components/header";
import { Icon } from "@components/icon/icon";
import { PageListComponent } from "@components/page-list";

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
      name: "License",
      path: "/license",
      icon: Icon({
        name: "Groups",
        className: iconClasses,
      }),
    },
    {
      name: "Test 1",
      path: "/test1",
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
      <HeaderComponent />
      <PageListComponent pages={pages} />
    </>
  );
}

export default HomePage;
